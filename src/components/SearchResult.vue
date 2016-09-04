<template>
  <loading-box :show="loading"></loading-box>    
  <div class="searchResult" v-if="finished">
        <div class="result">
           <h4>Znaleziono {{total}} ogłoszeń</h4>
           <div class="ui divided items">
             <div class="ui middle aligned selection list" v-for="item in anounces" v-on:click="showAnounce(item)">
               <anounce-item :anounce=item></anounce-item>
             </div>
           </div>
        </div>
        
        <div class="pagingBox">
          <div class="ui pagination menu">
            <a v-for="page in noOfPages" v-on:click="goToPage(page)" class="item">{{page +1}}</a>
          </div>
        </div>

  </div>
</template>

<script>
import api from '../api'
import AnounceItem from './AnounceItem.vue'
import AnounceCard from './AnounceCard.vue'
import LoadingBox from './LoadingBox.vue'
require('semantic')
const itemsPerPage = 20

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
      api.search(this.searchQuery.phrase, this.searchQuery.page, itemsPerPage, (searchResult) => {
        this.searchFinished(searchResult)
      })
    },
    searchFinished: function (searchResult) {
      this.loading = false
      this.finished = true
      this.anounces = searchResult.anounces
      this.noOfPages = searchResult.totalCount / itemsPerPage
      this.total = searchResult.totalCount
      console.log('total:', this.total)
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
