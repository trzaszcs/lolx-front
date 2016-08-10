<template>
  <div class="search-result ui container">
    <div class="segment">
      <div v-if="searchStarted">
      
        <div v-if="searchLoading">
          Searching...
        </div>
        
        <div v-else class="result">
           <h1>Wyniki wyszukiwania</h1>
           <div class="ui middle aligned selection list" v-for="item in anounces">
               <anounce-item :anounce=item></anounce-item>
           </div>
        </div>

      </div>
    </div>

  
  </div>
</template>

<script>
import api from '../api'
import AnounceItem from './AnounceItem.vue'

export default {
  components: {
    AnounceItem
  },
  data () {
    return {
      anounces: [],
      searchQuery: {},
      searchStarted: false,
      searchLoading: false
    }
  },
  methods: {
    queryString: function () {
      return this.searchQuery.phrase
    },
    doSearch: function (page) {
      api.search(this.searchQuery.phrase, page, (anounces) => {
        this.searchFinished(anounces)
      })
    },
    searchFinished: function (anounces) {
      this.searchLoading = false
      this.anounces = anounces
    },
    startSearch: function (page) {
      this.searchStarted = true
      this.searchLoading = true
      this.doSearch(page)
    }
  },
  events: {
    'search': function (queryMsg) {
      console.log('do query', queryMsg)
      this.searchQuery = queryMsg
      this.startSearch(0)
    }
  }
}
</script>
