<template>
  <loading-box :show="loading"></loading-box>
  <div id="searchResult" class="searchResult listing" v-show="finished">
    <div class="result">
      <h4>
          Znaleziono {{total}} ogłoszeń
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
import {anouncesDecorator} from '../../decorator'
import api from '../../api'
import AnounceItem from './AnounceItem.vue'
import AnounceCard from '../AnounceCard.vue'
import LoadingBox from '../LoadingBox.vue'

const itemsPerPage = 20

const scrollToTop = () => {
  document.getElementsByTagName('body')[0].scrollIntoView()
}

export default {
  components: {
    AnounceItem,
    AnounceCard,
    LoadingBox
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
      api.search(this.searchQuery.phrase, this.searchQuery.type, this.searchQuery.page, this.searchQuery.location, this.searchQuery.categoryId, itemsPerPage, (searchResult) => {
        this.searchFinished(searchResult)
      })
    },
    searchFinished: function (searchResult) {
      this.loading = false
      this.finished = true
      this.anounces = anouncesDecorator(searchResult.anounces)
      this.noOfPages = searchResult.totalCount / itemsPerPage
      this.total = searchResult.totalCount
      scrollToTop()
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
    'initializeSearch': function (queryMsg) {
      console.log('do query', queryMsg)
      this.searchQuery = queryMsg
      this.startSearch()
    }
  }
}
</script>
