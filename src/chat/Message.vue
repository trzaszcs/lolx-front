<template>
  <div class="message" v-bind:class="{'author': msg.isAuthor, 'opponent': msg.isOpponent}">
    <span class="author">{{msg.author}}</span>
    <span class="creationDate">{{formatDate(msg.created)}}</span>
    <p>{{msg.msg}}</p>
  </div>
</template>

<script>
import util from '../util'

export default {
  props: ['msg'],
  methods: {
    formatDate: function (dateStr) {
      return util.prettyDateDetailed(new Date(dateStr))
    }
  }
}
</script>
