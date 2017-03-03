<template>
  <anounce-type-selection></anounce-type>   
</template>

<script>
import AnounceTypeSelection from './AnounceTypeSelection'

export default {
  components: {
    AnounceTypeSelection
  },
  data: function () {
    return {
    }
  },
  events: {
    'anounceTypeSelected': function (event) {
      this.$router.go({path: '/search'})
    }
  }
}
</script>
