<template>
  <button id="toolbarMenu" class="ui icon black button">
    <img src="../assets/menu.png" class="ui mini image"></img>
  </button>
  
  <div class="ui fluid popup bottom center">
    <ul>
      <li>
        <a v-link="{ path: '/search' }" data-tooltip="Nowe wyszukanie">
           Znajdź ogłoszenie
        </a>
      </li>
      <li>
        <a v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie">
           Dodaj ogłoszenie
        </a>
      </li>
      <li>
        <a v-link="{ path: '/myAccount' }" data-tooltip="Moje Konto">
           Moje konto
        </a>
      </li>
    </ul>
  </div>
  
</template>

<script>
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
    setTimeout(() => {
      $('#toolbarMenu').popup({
        popup: $('.popup'),
        on: 'click'
      }) }, 0)
  }
}
</script>
