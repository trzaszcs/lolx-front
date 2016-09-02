<template>
   <div class="ui action left icon fluid input">
     <input v-model="phrase" type="text" placeholder="Poszukuje kogoś kto..."/>
     <i class="search icon"></i>
     <button v-on:click="search" class="ui button">Szukaj</button> 
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
      this.emitSearchEvent()
    },
    emitSearchEvent: function () {
      this.$dispatch('search', {'phrase': this.phrase})
    }
  },
  ready: function () {
    const queryFromUrl = this.$route.query.phrase
    if (queryFromUrl) {
      this.phrase = queryFromUrl
      this.emitSearchEvent()
    }
  }
}
</script>
