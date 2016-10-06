<template>
  <select v-model="categoryId" v-on:change="selected" class="ui dropdown">
    <option selected value="-1">Wszystkie kategorie</option>
    <option  v-for="category in categories" v-bind:value="category.id">
      {{category.name}}
    </option>
  </select>
</template>

<script>
import $ from 'jquery'
import api from '../api'

export default {
  props: ['categoryId'],
  data () {
    return {
      categories: []
    }
  },
  methods: {
    selected: function () {
      this.$dispatch('categorySelected', {categoryId: this.categoryId === '-1' ? null : this.categoryId})
    }
  },
  ready: function () {
    if (!this.categoryId) {
      this.categoryId = '-1'
    }
    api.categories((categories) => {
      this.categories = categories
    })
    $('.ui.dropdown').dropdown()
  }
}
</script>
