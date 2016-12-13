<template>
  <loading-box :show="loading"></loading-box>
  <div class="anounce ui container">
    <order-steps v-if="showSteps()"></order-steps>
    <p></p>
    <anounce-card></anounce-card>
  </div>
</template>

<script>
import AnounceCard from './components/AnounceCard.vue'
import LoadingBox from './components/LoadingBox.vue'
import OrderSteps from './components/OrderSteps.vue'
import api from './api'

export default {
  components: {
    AnounceCard,
    LoadingBox,
    OrderSteps
  },
  data () {
    return {
      loading: false,
      showOrderSteps: true
    }
  },
  methods: {
    back: function () {
      this.$router.go(window.history.back())
    },
    showSteps: function () {
      const isShowStepsRemoved = window.localStorage.getItem('isShowStepsRemoved')
      return (isShowStepsRemoved === null) || (isShowStepsRemoved === 'false')
    }
  },
  ready: function () {
    this.loading = true
    const anounceId = this.$route.query.anounceId
    api.getById(anounceId, (anounce) => {
      this.$broadcast('showAnounce', {'anounce': anounce})
      this.loading = false
    })
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
