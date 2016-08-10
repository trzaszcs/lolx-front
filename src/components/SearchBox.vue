<template>
  <div class="listing ui container">
    <search-input></search-input>
    <search-result></search-result>
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
    }
  },
  events: {
    'search': function (searchQuery) {
      this.$broadcast('search', searchQuery)
    }
  }
}
</script>
