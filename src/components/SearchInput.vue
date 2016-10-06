<template>
  <div class="ui three column stackable grid">
    <div class="six wide column">
      <div class="ui left icon fluid input">
        <input v-model="phrase" type="text" placeholder="Poszukuje kogoś kto..." v-on:keyup.13="search"/>
        <i class="search icon"></i>
      </div>
    </div>
    <div class="four wide column">
      <location-input :location="location" :simple="true"></location-input>
    </div>
    <div class="three wide column">
      <category-box :category-id="categoryId"></category-box>
    </div>
    <div class="one wide column">
      <button v-on:click="search" class="ui teal button">Szukaj</button>
    </div>
  </div>
</template>

<script>
import LocationInput from './LocationInput'
import CategoryBox from './CategoryBox'

export default {
  components: {LocationInput, CategoryBox},
  data () {
    return {
      phrase: '',
      location: {title: ''},
      categoryId: null
    }
  },
  methods: {
    search: function () {
      this.$dispatch('search', {'phrase': this.phrase, 'location': this.location, 'categoryId': this.categoryId})
    }
  },
  events: {
    'search': function (event) {
      this.phrase = event.phrase
      this.location = event.location
      this.categoryId = event.categoryId
    },
    'location': function (location) {
      this.location = location
    },
    'categorySelected': function (event) {
      this.categoryId = event.categoryId
      this.search()
    }
  }
}
</script>
