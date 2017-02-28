<template>
  <div class="ui container main">
    <anounce-type></anounce-type>   
  </div>
</template>

<script>
import AnounceType from './components/AnounceType'
import cache from './utils/cache'

export default {
  components: {
    AnounceType
  },
  ready: function () {
    this.anounceType = cache.get('anounceType')
  },
  events: {
    'anounceTypeSelected': function (event) {
      this.$router.go({path: '/search'})
    }
  }
}
</script>
