<template>
  <div class="listing ui container">
    <anounce-card3></anounce-card3>
  </div>
</template>

<script>
import AnounceCard3 from 'components/AnounceCard.vue'
import $ from 'jquery'
export default {
  components: {
    AnounceCard3
  },
  data () {
    return {
      anounceId: ''
    }
  },
  methods: {
  },
  events: {
    'emitOrderEvent': function () {
      console.log('order')
    },
    'emitCloseEvent': function () {
      console.log('close')
      $('.ui.modal').modal('hide')
    }
  },
  ready: function () {
    const anounceId = this.$route.query.anounceId
    console.log(anounceId)
    this.anounceId = anounceId
    this.$broadcast('showAnounce', {'anounce': {id: anounceId}})
  }
}
</script>
