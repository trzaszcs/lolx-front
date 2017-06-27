<template>
  
  <div id='info-box' v-show="visible" class="ui fluid positive compact info message">
      <i class="close icon"></i>

    <div v-if="header" class="ui header">
      {{header}}
    </div>
    <slot>
      <p>{{message}}</p>
    </slot>
  </div>

</template>

<script>
import util from '../util'
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
        util.focusOnElement('info-box')
      }
    }
  }
}
</script>
