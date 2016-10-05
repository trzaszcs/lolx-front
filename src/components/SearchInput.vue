<template>
  <div class="ui three column stackable grid">
    <div class="eight wide column">
      <div class="ui left icon fluid input">
        <input v-model="phrase" type="text" placeholder="Poszukuje kogoś kto..." v-on:keyup.13="search"/>
        <i class="search icon"></i>
      </div>
    </div>
    <div class="six wide column">
      <location-input :location="location" :simple="true"></location-input>
    </div>
    <div class="one wide column">
      <button v-on:click="search" class="ui teal button">Szukaj</button>
    </div>
  </div>
</template>

<script>
import LocationInput from './LocationInput'

export default {
  components: {LocationInput},
  data () {
    return {
      phrase: '',
      location: {title: ''}
    }
  },
  methods: {
    search: function () {
      this.$dispatch('search', {'phrase': this.phrase, 'location': this.location})
    }
  },
  events: {
    'search': function (event) {
      this.phrase = event.phrase
      this.location = event.location
    },
    'location': function (location) {
      this.location = location
    }
  }
}
</script>
