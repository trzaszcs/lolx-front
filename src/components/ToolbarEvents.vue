<template>
  <button v-show="noOfEvents > 0" id="events" class="ui icon black button">
    <img  src="../assets/bell.png" class="ui mini image"></img>
    <div class="floating ui red label">{{noOfEvents}}</div>
  </button>
  
  <div class="ui fluid popup bottom center">
    <ul>
      <li v-if="eventsMap.unreadMessages && eventsMap.unreadMessages > 0">
        <a v-on:click="showUpdatedChats()">
           Nowych wiadomości: {{eventsMap.unreadMessages}}
        </a>
      </li>
      <li v-if="eventsMap.newRequestOrders && eventsMap.newRequestOrders > 0">
        <a v-on:click="showRequestOrders()">
           Nowych zamówień: {{eventsMap.newRequestOrders}}
        </a>
      </li>
      <li v-if="eventsMap.acceptedRequestOrders && eventsMap.acceptedRequestOrders > 0">
        <a v-on:click="showRequestOrders()">
           Nowych zaakceptowanych zamówień: {{eventsMap.acceptedRequestOrders}}
        </a>
      </li>
      <li v-if="eventsMap.rejectedRequestOrders && eventsMap.rejectedRequestOrders > 0">
        <a v-on:click="showRequestOrders()">
           Nowych odrzuconych zamówień: {{eventsMap.rejectedRequestOrders}}
        </a>
      </li>
    </ul>
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
    showUpdatedChats: function () {
      this.$router.go({path: '/myAccount', query: {section: 'chats'}})
    },
    showRequestOrders: function () {
      this.$router.go({path: '/myAccount', query: {section: 'requestOrders'}})
    }
  },
  ready: function () {
    registerListener((event) => {
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
      this.noOfEvents = (unreadMessages + newRequestOrders + acceptedRequestOrders + rejectedRequestOrders)
    })
    setTimeout(() => {
      $('#events').popup({
        popup: $('.popup'),
        on: 'click'
      }) }, 0)
  }
}
</script>
