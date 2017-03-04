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
import api from '../api'

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
    const $dropdown = $('.ui.categoryBoxDropdown')
    let initDropdownSelection = (val, $dropdown) => {
      let selectedCategory = this.categories.filter((element) => element.id === val)[0]
      if (!selectedCategory) {
        selectedCategory = this.categories[0]
      }
      $dropdown.children('div.text')
        .text(selectedCategory.name).removeClass('default')
      $dropdown.find('div.menu').find(`item[data-value='${selectedCategory.id}']`)
        .addClass('active')
        .addClass('selected')
    }
    api.categories((response) => {
      let categories = response
      categories.splice(0, 0, {name: 'Wszystkie Kategorie', id: -1})
      this.categories = categories
      $dropdown.dropdown({onChange: this.onSelect})
      initDropdownSelection(this.categoryId, $dropdown)
    })
  }
}
</script>
