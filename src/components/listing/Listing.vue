<template>
  <div class="searchBox ui container">
    <h4 v-if="!searchStarted">
      Znajdź ogłoszenia typu
      <anounce-type-select :type="anounceType"></anounce-type-select>
    </h4>
    <search-input></search-input>
    <search-result></search-result>
  </div>
</template>

<script>
import AnounceType from '../AnounceType.vue'
import SearchInput from './SearchInput.vue'
import SearchResult from './SearchResult.vue'
import AnounceTypeSelect from './AnounceTypeSelect.vue'
import cache from '../../utils/cache'
import searchQueryParser from './searchQueryParser'
import util from '../../util'
import api from '../../api'

const buildSearchEvent = (phrase, location, page, categoryId, anounceType) => {
  return {phrase, location, page, categoryId, anounceType}
}

export default {
  components: {
    SearchInput,
    SearchResult,
    AnounceTypeSelect,
    AnounceType
  },
  data () {
    return {
      phrase: '',
      location: '',
      categoryId: null,
      anounceType: null,
      page: 0,
      searchStarted: false,
      ignoreAddressChangedEvent: false
    }
  },
  methods: {
    emitEvent: function () {
      this.searchStarted = true
      this.$broadcast('initializeSearch', buildSearchEvent(this.phrase, this.location, this.page, this.categoryId, this.anounceType))
    },
    changeAddress: function () {
      let query = {phrase: this.phrase, page: this.page, 'anounceType': this.anounceType}
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
      if (!this.anounceType && !urlHasSearchParams) {
        // go to anounceType selection
        this.$router.go({path: '/anounceTypeSelection'})
        return null
      }

      if (urlHasSearchParams) {
        if ('page' in searchQueryParams) {
          this.page = searchQueryParams.page
        }
        if ('location' in searchQueryParams) {
          this.location = searchQueryParams.location
        }

        this.categoryId = 'categoryId' in searchQueryParams ? searchQueryParams.categoryId : null

        if ('anounceType' in searchQueryParams) {
          this.anounceType = searchQueryParams.anounceType
        }
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
    'anounceTypeChanged': function (event) {
      this.anounceType = event.type
      if (this.searchStarted) {
        this.changeAddress()
        this.emitEvent()
      }
    },
    'anounceTypeSelected': function (event) {
      this.anounceType = event.type
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
