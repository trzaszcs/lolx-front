<template>
  <div class="listing ui container">
    <search-input></search-input>
    <search-result></search-result>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
import SearchResult from './SearchResult.vue'

const buildSearchEvent = (phrase, page) => {
  return {phrase, page}
}

export default {
  components: {
    SearchInput,
    SearchResult
  },
  data () {
    return {
      phrase: '',
      page: 0
    }
  },
  methods: {
    startSearch: function () {
      this.$router.go({'path': '/search', 'query': {phrase: this.phrase, page: this.page}})
      this.$broadcast('search', buildSearchEvent(this.phrase, this.page))
    }
  },
  events: {
    'search': function (event) {
      this.phrase = event.phrase
      this.startSearch()
    },
    'listing-page-changed': function (event) {
      this.page = event.page
      this.startSearch()
    }
  }
}
</script>
