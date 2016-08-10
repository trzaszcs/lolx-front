<template>
  <div class="searchInput ui section">
   <div class="ui action left icon input">
     <input v-model="phrase" type="text" placeholder="Szukaj..."/>
     <i class="search icon"></i>
     <button v-on:click="search" class="ui button">Search</button> 
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phrase: ''
    }
  },
  methods: {
    search: function () {
      this.$router.go({'path': '/search', 'query': {phrase: this.phrase}})
      this.$dispatch('search', {'phrase': this.phrase})
    }
  },
  ready: function () {
    const queryFromUrl = this.$route.query.phrase
    if (queryFromUrl) {
      this.phrase = queryFromUrl
    }
  }
}
</script>
