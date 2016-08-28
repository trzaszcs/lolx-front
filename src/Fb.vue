<template>
  <loading-box :show="loading"></loading-box>
</template>

<script>
import LoadingBox from './components/LoadingBox.vue'

export default {
  data () {
    return {
      loading: true
    }
  },
  components: {
    LoadingBox
  },
  ready: function () {
    window.location = `${window.location.origin}/#!/login${window.location.search}`
  }
}
</script>
