<template>
  <div class="anounce ui container">
    <loading-box :show="anounceLoading"></loading-box>
    <anounce-card></anounce-card>
  </div>
</template>

<script>
import AnounceCard from 'components/AnounceCard.vue'
import LoadingBox from 'components/LoadingBox.vue'
import api from './api'

export default {
  components: {
    AnounceCard,
    LoadingBox
  },
  data () {
    return {
      anounceLoading: true
    }
  },
  methods: {
  },
  ready: function () {
    this.anounceLoading = true
    const anounceId = this.$route.query.anounceId
    console.log(anounceId)
    api.getById(anounceId, (searchResult) => {
      const anounce = searchResult.anounces[0]
      this.$broadcast('showAnounce', {'anounce': anounce})
    })
    this.anounceLoading = false
  },
  events: {
    'emitOrderEvent': function () {
      console.log('order')
    },
    'emitCloseEvent': function () {
      console.log('close')
      this.$router.go(window.history.back())
    }
  }
}
</script>
