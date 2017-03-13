<template>
 <div class="ui fluid selection dropdown categoryBoxDropdown">
  <i class="dropdown icon"></i>
  <div class="default text"></div>
  <div class="menu">
    <div class="item" v-for="category in categories" v-bind:data-value="category.id">{{category.name}}</div>
  </div>
</div>

</template>

<script>
import $ from 'jquery'
import {categories} from '../const'

const selectCategory = (categoryId, categories, $dropdown) => {
  const intCategoryId = parseInt(categoryId)
  let selectedCategory = categories.filter((element) => element.id === intCategoryId)[0]
  if (!selectedCategory) {
    selectedCategory = categories[0]
  }
  $dropdown.children('div.text')
    .text(selectedCategory.name).removeClass('default')
  $dropdown.find('div.menu')
    .find(`item[data-value='${selectedCategory.id}']`)
    .addClass('active')
    .addClass('selected')
}

export default {
  props: ['categoryId'],
  data () {
    return {
      categories: []
    }
  },
  methods: {
    onSelect: function (categoryId) {
      this.$dispatch('categorySelected', {categoryId: categoryId === '-1' ? null : categoryId})
    }
  },
  ready: function () {
    let importedCategories = categories.slice()
    importedCategories.splice(0, 0, {name: 'Wszystkie Kategorie', id: -1})
    this.categories = importedCategories
    setTimeout(
      () => {
        const $dropdown = $('.ui.categoryBoxDropdown')
        $dropdown.dropdown({onChange: this.onSelect})
        if (!this.categoryId) {
          selectCategory(null, this.categories, $('.ui.categoryBoxDropdown'))
        }
      },
    0)
  },
  watch: {
    'categoryId': function (categoryId) {
      if (this.categories.length > 0) {
        selectCategory(categoryId, this.categories, $('.ui.categoryBoxDropdown'))
      }
    }
  }
}
</script>
