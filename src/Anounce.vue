<template>
  <div class="anounce ui container">
    <div class="ui segment">
      <div class="ui button" v-on:click="back()">wstecz</div>
    </div>
    <loading-box :show="anounceLoading"></loading-box>
    <order-steps></order-steps>
    <anounce-card></anounce-card>
  </div>
</template>

<script>
import AnounceCard from 'components/AnounceCard.vue'
import LoadingBox from 'components/LoadingBox.vue'
import OrderSteps from 'components/OrderSteps.vue'
import api from './api'

export default {
  components: {
    AnounceCard,
    LoadingBox,
    OrderSteps
  },
  data () {
    return {
      anounceLoading: true
    }
  },
  methods: {
    back: function () {
      this.$router.go(window.history.back())
    }
  },
  ready: function () {
    this.anounceLoading = true
    const anounceId = this.$route.query.anounceId
    api.getById(anounceId, (anounce) => {
      this.$broadcast('showAnounce', {'anounce': anounce})
    })
    this.anounceLoading = false
  },
  events: {
    'emitOrderEvent': function (order) {
      console.log('anounce order -> ', order)
    },
    'emitCloseEvent': function () {
      console.log('close')
      this.$router.go(window.history.back())
    }
  }
}
</script>
