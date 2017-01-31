<template>
  <div class="dashboard">
    <h2>Wybierz rodzaj oferty której szukasz</h2>
    <div class="ui stackable two column grid">

      <div class="column" v-on:click="narrowOffers('ORDER')">
        <div class="cell order">
          <h2>Zleć</h2>
          Znajdź osoby szukające pracy
        </div>
      </div>

      <div class="column"  v-on:click="narrowOffers('FIND')">
        <div class="cell find">
          <h2>Wykonam</h2>
          Znajdź osoby zlecające pracę
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
