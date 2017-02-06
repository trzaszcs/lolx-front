<template>
  <div class="ui inline dropdown">
      <div class="text">{{typesMap[type]}}</div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="header">Rodzaj oferty</div>
        <div class="item" v-for="t in types" data-type="{{t}}" v-bind:class="{active: type === t}">{{typesMap[t]}}</div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import cache from '../utils/cache'

const TYPES_MAP = {
  'ORDER': 'Zlecę',
  'EXECUTE': 'Wykonam'
}

export default {
  props: ['type'],
  data () {
    return {
      typesMap: TYPES_MAP,
      types: Object.keys(TYPES_MAP)
    }
  },
  ready: function () {
    $('.ui.dropdown').dropdown({
      onChange: (value, text, selectedItem) => {
        const anounceType = selectedItem.attr('data-type')
        cache.put('anounceType', anounceType)
        this.$dispatch('anounceTypeSelected', {type: anounceType})
      }
    })
  }
}
</script>
