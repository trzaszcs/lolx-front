<template>
   <div class="ui action left icon fluid input">
     <input v-model="phrase" type="text" placeholder="Poszukuje kogoś kto..."/>
     <i class="search icon"></i>
     <button v-on:click="search" class="ui teal button">Szukaj</button> 
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
      this.$dispatch('search', {'phrase': this.phrase})
    }
  },
  events: {
    'search': function (event) {
      this.phrase = event.phrase
    }
  }
}
</script>
