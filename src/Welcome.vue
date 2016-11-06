<template>
  <div class="ui container main">
    <search-box></search-box>   
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import util from './util'
import api from './api'

export default {
  components: {
    SearchBox
  },
  ready: function () {
    util.currentLocation((coords) => {
      if (coords) {
        console.log('coords:', coords)
        api.reverseGeocode(coords.latitude, coords.longitude, (result) => {
          console.log('address: ', result)
        })
      }
    })
  }
}
</script>
