<template>
  <div class="listing ui container">
    <search-input></search-input>
    <search-result :search-query=searchQuery></search-result>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
import SearchResult from './SearchResult.vue'

export default {
  components: {
    SearchInput,
    SearchResult
  },
  data () {
    return {
      'searchQuery': {}
    }
  },
  methods: {
  },
  events: {
    'search': function (searchQuery) {
      console.log('--->', searchQuery)
      this.searchQuery = searchQuery
    }
  }
}
</script>
