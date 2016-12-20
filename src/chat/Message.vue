<template>
  <div class="message" v-bind:class="{'author': msg.authorsMessage, 'opponent': msg.opponentsMessage, 'action': msg.action}">
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p>{{msg.msg}}</p>
  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
