<template>
  <div class="search-result ui container">
    <div class="segment">
      Result for '{{queryString()}}'
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchQuery'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    queryString: function () {
      return this.searchQuery.phrase
    }
  }
}
</script>
