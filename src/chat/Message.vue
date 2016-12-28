<template>
  <div class="message" v-bind:class="{'author': msg.authorsMessage, 'opponent': msg.opponentsMessage, 'action': msg.action}">

   <div v-if="msg.message">
    <span class="author">{{msg.authorPretty}}</span>
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p><span class="type">Wiadomość:</span>{{msg.msg}}</p>
   </div>

   <div v-if="msg.requestOrderCreation">
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p>
      <span class="type">Zamówienie:</span>
      Utworzenie <a v-link="{ path: '/order', query: {orderId: msg.id} }">zamówienia</a> przez <span class="author">{{msg.author}}</span>
    </p>
   </div>

   <div v-if="msg.requestOrderAcceptance">
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p>
      <span class="type">Zamówienie:</span>
      Akceptacja <a v-link="{ path: '/order', query: {orderId: msg.id} }">zamówienia</a> przez <span class="author">{{msg.author}}</span>
    </p>
   </div>

   <div v-if="msg.requestOrderCancelation">
    <span class="creationDate">{{msg.creationDatePretty}}</span>
    <p>
      <span class="type">Zamówienie:</span>
      Anulowanie <a v-link="{ path: '/order', query: {orderId: msg.id} }">zamówienia</a> przez <span class="author">{{msg.author}}</span>
    </p>
   </div>

  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
