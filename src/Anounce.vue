<template>
  <div class="listing ui container">
    <anounce-card></anounce-card>
  </div>
</template>

<script>
import AnounceCard from 'components/AnounceCard.vue'
import $ from 'jquery'
export default {
  components: {
    AnounceCard
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
