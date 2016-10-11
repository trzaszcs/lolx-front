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

export default {
  props: ['location', 'simple'],
  ready: function () {
    const buildTitle = (result) => {
      let locationParts = {}
      let title = ''
      result.address_components.forEach((component) => { locationParts[component.types[0]] = component.short_name })

      if ('locality' in locationParts) {
        title = locationParts['locality'] + ', '
      }
      /*
      if ('route' in locationParts) {
        title += locationParts['route']
      }

      if ('street_number' in locationParts) {
        title += ' ' + locationParts['street_number'] + ', '
      }

      if ('political' in locationParts) {
        title += ' ' + locationParts['political']
      }
      */
      if ('administrative_area_level_1' in locationParts) {
        title += ' ' + locationParts['administrative_area_level_1']
      }

      return title
    }

    const getComponent = (result, componentName) => {
      const results = result.address_components.filter(component => {
        return component.types[0] === componentName
      })
      return results.length > 0 ? results[0].short_name : null
    }

    const mapResult = (result) => {
      return {
        title: buildTitle(result),
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        city: getComponent(result, 'locality'),
        state: getComponent(result, 'administrative_area_level_1')
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