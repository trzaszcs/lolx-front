<template>
  <div class="message" v-bind:class="{'author': msg.authorsMessage, 'opponent': msg.opponentsMessage, 'action': msg.action}">

   <div v-if="msg.message">
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p>{{msg.msg}}</p>
   </div>

   <div v-if="msg.requestOrderCreation">
    <p>Akcja: Utworzenie zamówienia</p>
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
   </div>

   <div v-if="msg.requestOrderAcceptance">
    <p>Akcja: Akceptacja zamówienia</p>
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
   </div>

   <div v-if="msg.requestOrderCancelation">
    <p>Akcja: Anulowanie zamówienia</p>
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
   </div>

  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
