<template>
  <div class="search-result ui container">
    <div class="segment">
      <div v-if="searchStarted">
        <div v-if="searchLoading">
          Searching...
        </div>
        <div v-else>
          Result for '{{queryString()}}'
        </div>
      </div>
    </div>

    <div class="ui middle aligned selection list">
      <div v-for="item in items" class="item">
        <img class="ui avatar image" src="../assets/plumber.png">
        <div class="content">
          <div class="header">{{item.title}}</div>
          <div class="description">{{item.desc}}</div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import api from '../api'

export default {
  components: {
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
