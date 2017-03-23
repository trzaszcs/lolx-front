<template>
  <div class="searchBox ui container">
    <search-input></search-input>
    <search-result></search-result>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
import SearchResult from './SearchResult.vue'
import cache from '../../utils/cache'
import searchQueryParser from './searchQueryParser'
import util from '../../util'
import api from '../../api'

const buildSearchEvent = (phrase, location, page, categoryId) => {
  return {phrase, location, page, categoryId}
}

export default {
  components: {
    SearchInput,
    SearchResult
  },
  data () {
    return {
      phrase: '',
      location: '',
      categoryId: null,
      page: 0,
      searchStarted: false,
      ignoreAddressChangedEvent: false
    }
  },
  methods: {
    emitEvent: function () {
      this.searchStarted = true
      this.$broadcast('initializeSearch', buildSearchEvent(this.phrase, this.location, this.page, this.categoryId))
    },
    changeAddress: function () {
      let query = {phrase: this.phrase, page: this.page}
      if (this.location) {
        query.location = this.location.title
        query.lat = this.location.latitude
        query.lng = this.location.longitude
      }
      if (this.categoryId) {
        query.category = this.categoryId
      }
      this.ignoreAddressChangeEvent = true
      this.$router.go({'path': '/search', 'query': query})
    },
    bindQueryParams: function () {
      const searchQueryParams = searchQueryParser(this.$route.query)
      this.anounceType = cache.get('anounceType')
      const urlHasSearchParams = Object.keys(searchQueryParams).length > 0

      if (urlHasSearchParams) {
        if ('page' in searchQueryParams) {
          this.page = searchQueryParams.page
        }
        if ('location' in searchQueryParams) {
          this.location = searchQueryParams.location
        }

        this.categoryId = 'categoryId' in searchQueryParams ? searchQueryParams.categoryId : null

        if ('phrase' in searchQueryParams) {
          this.phrase = searchQueryParams.phrase
        }
        this.emitEvent()
      }
    }
  },
  events: {
    'search': function (event) {
      this.phrase = event.phrase
      this.location = event.location
      this.categoryId = event.categoryId
      this.changeAddress()
      this.emitEvent()
    },
    'listing-page-changed': function (event) {
      this.page = event.page
      this.emitEvent()
      this.changeAddress()
    },
    'geolocation': function (event) {
      this.location = event
      this.emitEvent()
    },
    'address-changed': function (event) {
      if (!this.ignoreAddressChangeEvent) {
        this.bindQueryParams()
      }
      this.ignoreAddressChangeEvent = false
    }
  },
  ready: function () {
    this.bindQueryParams()
    util.currentLocation((coords) => {
      if (coords) {
        api.reverseGeocode(coords.latitude, coords.longitude, (result) => {
          const geo = result.results[0]
          this.location = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            title: util.decorateGeolocation(geo),
            city: util.geolocationCity(geo),
            state: util.geolocationState(geo)
          }
          this.emitEvent()
        })
      }
    })
  }
}
</script>
