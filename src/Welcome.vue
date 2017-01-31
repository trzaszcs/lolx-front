<template>
  <div class="ui container main">
    <offer-type v-if="!offerType"></offer-type>
    <search-box v-if="offerType" :offer-type="offerType"></search-box>   
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import OfferType from './components/OfferType'
import util from './util'
import api from './api'
import cache from './utils/cache'

export default {
  components: {
    SearchBox,
    OfferType
  },
  data: function () {
    return {
      offerType: null
    }
  },
  ready: function () {
    this.offerType = cache.get('offerType')
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
    'offerTypeSelected': function (event) {
      this.offerType = cache.get('offerType')
    }
  }
}
</script>
