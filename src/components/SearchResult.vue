<template>
  <div class="searchResult ui container">
    <div class="segment">
      <div v-if="searchStarted">
      
        <div v-if="searchLoading">
          Searching...
        </div>
        
        <div v-else class="result">
           <h1>Wyniki wyszukiwania</h1>
           <div class="ui middle aligned selection list" v-for="item in anounces" v-on:click="showAnounce(item)">
               <anounce-item :anounce=item></anounce-item>
           </div>
        </div>
        
        <div class="ui modal">
          <div class="header">Ogłoszenie</div>
          <anounce-card></anounce-card>
        </div>
        
        <div class="pagingBox">
          <div class="ui pagination menu">
            <a v-for="page in noOfPages" v-on:click="goToPage(page)" class="item">{{page +1}}</a>
          </div>
        </div>
      </div>
    </div>

  
  </div>
</template>

<script>
import api from '../api'
import AnounceItem from './AnounceItem.vue'
import AnounceCard from './AnounceCard.vue'
require('semantic')
var $ = require('jquery')
const itemsPerPage = 20

export default {
  components: {
    AnounceItem,
    AnounceCard
  },
  data () {
    return {
      anounces: [],
      searchQuery: {},
      searchStarted: false,
      searchLoading: false,
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
      this.searchLoading = false
      this.anounces = searchResult.anounces
      this.noOfPages = searchResult.totalCount / itemsPerPage
    },
    startSearch: function () {
      this.searchStarted = true
      this.searchLoading = true
      this.noOfPages = 0
      this.doSearch()
    },
    goToPage: function (page) {
      this.$dispatch('listing-page-changed', {page})
    },
    showAnounce: function (selectedItem) {
      console.log(selectedItem)
      this.$broadcast('showAnounce', {'anounce': selectedItem})
      $('.ui.modal').modal('show')
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
