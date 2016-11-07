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
        api.reverseGeocode(coords.latitude, coords.longitude, (result) => {
          const geo = result.results[0]
          this.$broadcast(
            'geolocation',
            {latitude: coords.latitude,
             longitude: coords.longitude,
             title: util.decorateGeolocation(geo),
             city: util.geolocationCity(geo),
             state: util.geolocationState(geo)})
        })
      }
    })
  }
}
</script>
