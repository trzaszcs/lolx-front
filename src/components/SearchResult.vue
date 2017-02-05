<template>
  <loading-box :show="loading"></loading-box>
  <div class="searchResult listing" v-show="finished">
    <div class="result">
      <h4>
          Znaleziono {{total}} ogłoszeń typu
          <anounce-type-select :type="searchQuery.anounceType"></anounce-type-select>
      </h4>
      <div class="ui large middle aligned selection list" v-for="item in anounces" v-on:click="showAnounce(item)">
        <anounce-item :anounce=item></anounce-item>
      </div>
    </div>
        
    <div class="pagingBox" v-if="noOfPages > 1">
      <div class="ui pagination menu">
        <a v-for="page in noOfPages" v-on:click="goToPage(page)" class="item" v-bind:class="{selected:(page == (searchQuery.page || 0))}">{{page +1}}</a>
      </div>
    </div>

  </div>
</template>

<script>
import {anouncesDecorator} from '../decorator'
import api from '../api'
import AnounceItem from './AnounceItem.vue'
import AnounceCard from './AnounceCard.vue'
import LoadingBox from './LoadingBox.vue'
import AnounceTypeSelect from './AnounceTypeSelect.vue'

const itemsPerPage = 20

export default {
  components: {
    AnounceItem,
    AnounceCard,
    LoadingBox,
    AnounceTypeSelect
  },
  data () {
    return {
      anounces: [],
      searchQuery: {},
      loading: false,
      finished: false,
      total: 0,
      noOfPages: 0
    }
  },
  methods: {
    queryString: function () {
      return this.searchQuery.phrase
    },
    doSearch: function () {
      api.search(this.searchQuery.phrase, this.searchQuery.page, this.searchQuery.location, this.searchQuery.categoryId, itemsPerPage, (searchResult) => {
        this.searchFinished(searchResult)
      })
    },
    searchFinished: function (searchResult) {
      this.loading = false
      this.finished = true
      this.anounces = anouncesDecorator(searchResult.anounces)
      this.noOfPages = searchResult.totalCount / itemsPerPage
      this.total = searchResult.totalCount
    },
    startSearch: function () {
      this.finished = false
      this.loading = true
      this.noOfPages = 0
      this.total = 0
      this.doSearch()
    },
    goToPage: function (page) {
      this.$dispatch('listing-page-changed', {page})
    },
    showAnounce: function (selectedItem) {
      this.$router.go({'path': '/anounce', 'query': { anounceId: selectedItem.id }})
    }
  },
  events: {
    'search': function (queryMsg) {
      console.log('do query', queryMsg)
      this.searchQuery = queryMsg
      this.startSearch()
    }
  }
}
</script>
