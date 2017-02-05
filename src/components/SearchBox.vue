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
import SearchInput from './SearchInput.vue'
import SearchResult from './SearchResult.vue'
import AnounceTypeSelect from './AnounceTypeSelect.vue'

const buildSearchEvent = (phrase, location, page, categoryId, anounceType) => {
  return {phrase, location, page, categoryId, anounceType}
}

export default {
  props: ['anounceType'],
  components: {
    SearchInput,
    SearchResult,
    AnounceTypeSelect
  },
  data () {
    return {
      phrase: '',
      location: '',
      categoryId: null,
      page: 0,
      searchStarted: false
    }
  },
  methods: {
    emitEvent: function () {
      this.searchStarted = true
      this.$broadcast('search', buildSearchEvent(this.phrase, this.location, this.page, this.categoryId, this.anounceType))
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
      this.$router.go({'path': '/search', 'query': query})
    }
  },
  events: {
    'search': function (event) {
      this.phrase = event.phrase
      this.location = event.location
      this.categoryId = event.categoryId
      this.emitEvent()
      this.changeAddress()
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
    'anounceTypeSelected': function (event) {
      this.anounceType = event.type
      if (this.searchStarted) {
        this.changeAddress()
        this.emitEvent()
      }
    }
  },
  ready: function () {
    if ('phrase' in this.$route.query) {
      if ('page' in this.$route.query) {
        this.page = this.$route.query.page
      }
      if ('location' in this.$route.query &&
          'lat' in this.$route.query &&
          'lng' in this.$route.query) {
        this.location = {title: this.$route.query.location, latitude: this.$route.query.lat, longitude: this.$route.query.lng}
      }
      if ('category' in this.$route.query) {
        this.categoryId = this.$route.query.category
      }
      this.phrase = this.$route.query.phrase
      if ('anounceType' in this.$route.query) {
        this.anounceType = this.$route.query.anounceType
      }
      this.emitEvent()
    } else {
      this.searchStarted = false
    }
  }
}
</script>
