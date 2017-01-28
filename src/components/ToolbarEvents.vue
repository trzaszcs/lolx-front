<template>
  <button v-show="noOfEvents > 0" id="events" class="ui icon black button">
    <img  src="../assets/bell.png" class="ui mini image"></img>
    <div class="floating ui red label">{{noOfEvents}}</div>
  </button>
  
  <div class="ui fluid popup bottom left transition">
    <div class="ui one column divided center aligned grid">
      <div class="column">
        <a v-if="eventsMap.unreadMessages && eventsMap.unreadMessages > 0">Nowych wiadomości: {{eventsMap.unreadMessages}}</a>
        <a v-if="eventsMap.newRequestOrders && eventsMap.newRequestOrders > 0">Nowych zamówień: {{eventsMap.newRequestOrders}}</a>
        <a v-if="eventsMap.acceptedRequestOrders && eventsMap.acceptedRequestOrders > 0">Nowych zaakceptowanych zamówień: {{eventsMap.acceptedRequestOrders}}</a>
        <a v-if="eventsMap.rejectedRequestOrders && eventsMap.rejectedRequestOrders > 0">Nowych odrzuconych zamówień: {{eventsMap.rejectedRequestOrders}}</a>
      </div>
    </div>
  </div>
  
</template>

<script>
import {registerListener} from '../utils/backendEventsPoller'
import $ from 'jquery'

export default {
  data () {
    return {
      eventsMap: {},
      noOfEvents: 0
    }
  },
  methods: {
  },
  ready: function () {
    registerListener((event) => {
      console.log('backend event:', event)

      const unreadMessages = event.unreadMessages

      const newRequestOrders = event.requestOrderEvents.filter(event => {
        return event.type === 'NEW_REQUEST_ORDER'
      }).length

      const acceptedRequestOrders = event.requestOrderEvents.filter(event => {
        return event.type === 'REQUEST_ORDER_ACCEPTED'
      }).length

      const rejectedRequestOrders = event.requestOrderEvents.filter(event => {
        return event.type === 'REQUEST_ORDER_REJECTED'
      }).length

      this.eventsMap = {unreadMessages, newRequestOrders, acceptedRequestOrders, rejectedRequestOrders}
      this.noOfEvents += (unreadMessages + newRequestOrders + acceptedRequestOrders + rejectedRequestOrders)
    })

    setTimeout(() => {
      $('#events').popup({
        popup: $('.popup'),
        on: 'click'
      }) }, 0)
  }
}
</script>
