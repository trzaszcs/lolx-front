<template>
  <div class="listing ui component">
    <search-input phrase="xx"></search-input>
    <h1>Rezultat</h1>
  </div>
</template>

<script>
import SearchInput from 'components/SearchInput.vue'

export default {
  components: {
    SearchInput
  },
  data () {
    return {
    }
  },
  methods: {
    getQuery: function () {
      return this.$route.query.phrase
    }
  },
  computed: {
    queryPhrase: function () {
      return this.$route.query.phrase
    }
  }
}
</script>

<style scoped>
</style>

