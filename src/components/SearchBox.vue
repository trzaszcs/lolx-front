<template>
  <div class="searchBox ui container">
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
    emitEvent: function () {
      this.$broadcast('search', buildSearchEvent(this.phrase, this.page))
    },
    changeAddress: function () {
      this.$router.go({'path': '/search', 'query': {phrase: this.phrase, page: this.page}})
    }
  },
  events: {
    'search': function (event) {
      console.log('1')
      this.phrase = event.phrase
      this.emitEvent()
      this.changeAddress()
    },
    'listing-page-changed': function (event) {
      this.page = event.page
      this.emitEvent()
      this.changeAddress()
    }
  },
  ready: function () {
    if ('phrase' in this.$route.query) {
      if ('page' in this.$route.query) {
        this.page = this.$route.query.page
      }
      this.phrase = this.$route.query.phrase
      this.emitEvent()
    }
  }
}
</script>
