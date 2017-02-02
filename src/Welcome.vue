<template>
  <div class="ui container main">
    <anounce-type v-if="!anounceType"></anounce-type>
    <search-box v-if="anounceType" :anounce-type="anounceType"></search-box>   
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import AnounceType from './components/AnounceType'
import util from './util'
import api from './api'
import cache from './utils/cache'

export default {
  components: {
    SearchBox,
    AnounceType
  },
  data: function () {
    return {
      anounceType: null
    }
  },
  ready: function () {
    this.anounceType = cache.get('anounceType')
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
      this.anounceType = cache.get('anounceType')
    }
  }
}
</script>
