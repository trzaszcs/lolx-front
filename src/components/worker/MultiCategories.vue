<template>
 <select multiple="" class="ui fluid dropdown multiCategoryBoxDropdown">
   <option v-for="category in baseCategories" v-bind:value="category.id">{{category.name}}</option>
 </select>
</template>

<script>
import $ from 'jquery'
import {categories} from '../../const'

export default {
  props: ['selectedCategories'],
  data () {
    return {
      baseCategories: [],
      $dropdown: null
    }
  },
  methods: {
    onSelect: function (categoryIds) {
      this.$dispatch('categorySelected', {ids: categoryIds})
    }
  },
  ready: function () {
    this.baseCategories = categories
    this.$dropdown = $('.ui.multiCategoryBoxDropdown')
    setTimeout(
      () => {
        this.$dropdown.dropdown({
          onChange: this.onSelect
        })
        this.$dropdown.dropdown('set selected', this.selectedCategories)
      },
    0)
  }
}
</script>
