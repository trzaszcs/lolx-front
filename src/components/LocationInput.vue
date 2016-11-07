<template>
  <div class="ui fluid search locationInput">
    <div class="ui left icon input">
      <input class="searchPrompt"  placeholder="Lokalizacja..." v-model="location.title">
      <i class="marker icon" v-show="!simple"></i>
    </div>
    <div class="results">
    </div>
  </div>
</template>

<script>
import api from '../api'
import $ from 'jquery'
import util from '../util'

export default {
  props: ['location', 'simple'],
  ready: function () {
    const mapResult = (result) => {
      return {
        title: util.decorateGeolocation(result),
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        city: util.geolocationCity(result),
        state: util.geolocationState(result)
      }
    }

    $('.ui.search').search(
      {
        apiSettings: {
          mockResponseAsync: (settings, callback) => {
            api.geocode(this.location.title, (response) => {
              const suggestedLocations = response.results.map(r => mapResult(r))
              callback({results: suggestedLocations})
            })
          }},
        selector: {prompt: '.searchPrompt'},
        minCharacters: 2,
        searchFullText: true,
        onSelect: (result, response) => {
          this.$dispatch('location', result)
          return true
        },
        onResultsOpen: () => {
          this.location.latitude = null
          this.location.longitude = null
          this.$dispatch('location', this.location)
        },
        error: {
          noResults: 'Brak rezultatów.'
        }
      })
  }
}
</script>