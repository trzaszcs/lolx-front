<template>
  <div class="message" v-bind:class="{'author': msg.authorsMessage, 'opponent': msg.opponentsMessage, 'action': msg.action}">

   <div id="{{msg.id}}">
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p>{{msg.msg}}</p>
   </div>

  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
