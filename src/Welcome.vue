<template>
  <div class="ui container main">
    <div class="anounceType">
      <h3>Czego szukasz ?</h3>
      <div class="ui stackable two column grid">
        <div class="column" v-on:click="findAnounces()">
          <div class="cell order">
            <h2>Chcę dorobić</h2>
            Szukaj drobnych zleceń w Twojej okolicy
          </div>
        </div>

        <div class="column"  v-on:click="addAnounce()">
          <div class="cell offer">
            <h2>Dam dorobić</h2>
            Znajdź osoby, które wykonają Twoje zlecenie
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
