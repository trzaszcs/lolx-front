<template>
  <anounce-type-selection></anounce-type>   
</template>

<script>
import AnounceTypeSelection from './AnounceTypeSelection'
import util from './util'
import api from './api'

export default {
  components: {
    AnounceTypeSelection
  },
  data: function () {
    return {
    }
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
  },
  events: {
    'anounceTypeSelected': function (event) {
      this.$router.go({path: '/search'})
    }
  }
}
</script>
