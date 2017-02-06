<template>
  
  <div id='info-box' v-show="visible" class="ui positive message">
    <div v-if="header" class="header">
      {{header}}
    </div>
    <slot>
      <p>{{message}}</p>
    </slot>
  </div>

</template>

<script>
import $ from 'jquery'

export default {
  props: ['header', 'message', 'visible'],
  data () {
    return {
    }
  },
  ready: function () {
    $('.message .close')
      .on('click', function () {
        $(this)
          .closest('.message')
          .hide() })
  },
  watch: {
    visible: function (newV) {
      if (newV) {
        const position = document.getElementById('info-box').getBoundingClientRect()
        window.scrollTo(position.left, position.top)
      }
    }
  }
}
</script>
