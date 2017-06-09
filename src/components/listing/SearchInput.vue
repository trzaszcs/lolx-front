<template>
  <div class="ui four column stackable grid searchInput">
    <div class="six wide column">
      <div class="ui left icon fluid input">
        <input v-model="phrase" type="text" placeholder="Szukaj drobnych zleceń" v-on:keyup.13="search"/>
        <i class="search icon"></i>
      </div>
    </div>
    <div class="four wide column">
      <location-input :location="location" style="width:95%;"></location-input>
    </div>
    <div class="three wide column">
      <category-box :category-id="categoryId" style="width:95%;margin: 0% 2%;"></category-box>
    </div>
    <div class="two wide column">
      <button v-on:click="search" class="ui fluid button">Szukaj</button>
    </div>
  </div>
  
  <p></p>
</template>

<script>
import LocationInput from '../LocationInput'
import CategoryBox from '../CategoryBox'

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
    'initializeSearch': function (event) {
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
