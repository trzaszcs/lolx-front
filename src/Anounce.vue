<template>
  <div class="listing ui container">
    <anounce-card></anounce-card>
  </div>
</template>

<script>
import AnounceCard from 'components/AnounceCard.vue'
import $ from 'jquery'
import api from './api'

export default {
  components: {
    AnounceCard
  },
  data () {
    return {
    }
  },
  methods: {
  },
  ready: function () {
    const anounceId = this.$route.query.anounceId
    console.log(anounceId)
    api.getById(anounceId, (searchResult) => {
      const anounce = searchResult.anounces[0]
      this.$broadcast('showAnounce', {'anounce': anounce})
    })
  },
  events: {
    'emitOrderEvent': function () {
      console.log('order')
    },
    'emitCloseEvent': function () {
      console.log('close')
      $('.ui.modal').modal('hide')
    }
  }
}
</script>
