<template>
  <div class="toolbarMenu ui dropdown">
    <button class="ui icon black button">
      <img src="../assets/menu.png" class="ui mini image"></img>
      <div v-if="noOfEvents" class="floating ui red label">{{noOfEvents}}</div>
    </button>
  
    <div class="menu" style="width: 180px">
      <a class="item" v-link="{ path: '/search' }">
        Znajdź ogłoszenie
      </a>
      <a class="item" v-link="{ path: '/addAnounce' }">
        Dodaj ogłoszenie
      </a>
      <a class="item" v-link="{ path: '/myAccount' }">
        Moje konto
      </a>
      <a class="item"  v-if="eventsMap.unreadMessages && eventsMap.unreadMessages > 0" v-on:click="showUpdatedChats()">
        Nowych wiadomości: {{eventsMap.unreadMessages}}
      </a>
      <a class="item" v-if="eventsMap.newRequestOrders && eventsMap.newRequestOrders > 0" v-on:click="showRequestOrders()">
        Nowych zamówień: {{eventsMap.newRequestOrders}}
      </a>
      <a class="item" v-if="eventsMap.acceptedRequestOrders && eventsMap.acceptedRequestOrders > 0"  v-on:click="showRequestOrders()">
        Nowych zaakceptowanych zamówień: {{eventsMap.acceptedRequestOrders}}
      </a>
      <a class="item" v-if="eventsMap.rejectedRequestOrders && eventsMap.rejectedRequestOrders > 0" v-on:click="showRequestOrders()">
        Nowych odrzuconych zamówień: {{eventsMap.rejectedRequestOrders}}
      </a>
      
    </div>

  </div>
  
</template>

<script>
import $ from 'jquery'
import {registerListener} from '../utils/backendEventsPoller'

const initPopup = () => {
  const setPopupLocation = ($button, $popup) => {
    const topPosition = $button.position().top + 10
    const leftPosition = $button.position().left - $popup.width() - 10
    $popup.css('left', leftPosition)
    $popup.css('top', topPosition)
  }
  let $toolbarMenu = $('.toolbarMenu')
  let $popup = $toolbarMenu.find('.menu')
  let $button = $toolbarMenu.find('button')
  setPopupLocation($button, $popup)
  $button.click(() => {
    $popup.toggle()
  })
  $(document).mouseup((e) => {
    if (e.which === 1 && !$button.is(e.target) && $button.has(e.target).length === 0) {
      $popup.hide()
    }
  })
}

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
      initPopup()
    }, 0)
  }
}
</script>
