<template>
  <div class="anounceType">
    <h2>Czego szukasz ?</h2>
    <div class="ui stackable two column grid">

      <div class="column" v-on:click="narrowOffers('ORDER')">
        <div class="cell order">
          <h2>Zarabiaj</h2>
          Szukaj drobnych zleceń w Twojej okolicy
        </div>
      </div>

      <div class="column"  v-on:click="narrowOffers('FIND')">
        <div class="cell find">
          <h2>Zlecaj</h2>
          Znajdź osoby, które wykonają Twoje zlecenie
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import cache from '../utils/cache'

export default {
  components: {
  },
  methods: {
    narrowOffers: function (type) {
      cache.put('offerType', type)
      this.$dispatch('offerTypeSelected', {})
    }
  }
}
</script>
