<template>
  <select v-model="categoryId" class="ui dropdown">
    <option value="">Kategoria...</option>
    <option  v-for="category in categories" v-bind:value="category.id">
      {{category.name}}
    </option>
  </select>
</template>

<script>
import $ from 'jquery'
import api from '../api'

export default {
  data () {
    return {
      categories: []
    }
  },
  methods: {
    selected: function (categoryId) {
      console.log('selected category' + categoryId)
    }
  },
  ready: function () {
    api.categories((categories) => {
      this.categories = categories
    })
    $('.ui.dropdown').dropdown()
  }
}
</script>
