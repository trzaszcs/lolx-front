<template>
  <div class="ui container main">
    <img class="ui big centered image" src="./assets/pumper.jpg">
    <div class="anounceType">
      <h1>Czego szukasz ?</h1>
      <div class="ui stackable two column grid">
        
        <div class="column" v-on:click="findAnounces()">
          <div class="cell order">
            <h1>Chcę dorobić</h1>
            <h2>Szukaj drobnych zleceń w Twojej okolicy</h2>
          </div>
        </div>


        <div class="column"  v-on:click="addAnounce()">
          <div class="cell offer">
            <h1>Dam dorobić</h1>
            <h2>Znajdź osoby, które wykonają Twoje zlecenie</h2>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    addAnounce: function () {
      this.$router.go({path: '/addAnounce'})
    },
    findAnounces: function () {
      this.$router.go({path: '/search'})
    },
    addWorker: function () {
      this.$router.go({path: '/myAccount', query: {section: 'account', createWorker: true}})
    },
    findWorkers: function () {
      this.$router.go({path: '/searchWorkers'})
    }
  },
  events: {
    'anounceTypeSelected': function (event) {
      this.$router.go({path: '/search'})
    }
  }
}
</script>
