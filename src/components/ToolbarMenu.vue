<template>
  <div class="toolbarMenu ui dropdown">
    <button class="ui icon black button">
      <img src="../assets/menu.png" class="ui mini image"></img>
    </button>
  
    <div class="menu" style="width: 180px">
      <a class="item" v-link="{ path: '/search' }" data-tooltip="Nowe wyszukanie">
        Znajdź ogłoszenie
      </a>
      <a class="item" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie">
        Dodaj ogłoszenie
      </a>
      <a class="item" v-link="{ path: '/myAccount' }" data-tooltip="Moje Konto">
        Moje konto
      </a>
    </div>

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
      let $toolbarMenu = $('.toolbarMenu')
      let $popup = $toolbarMenu.find('.menu')
      let $button = $toolbarMenu.find('button')
      const topPosition = $button.position().top
      const leftPosition = $button.position().left - $popup.width() - 10
      $popup.css('left', leftPosition)
      $popup.css('top', topPosition)
      $button.click(() => {
        $popup.toggle()
      })
      $(document).mouseup((e) => {
        if (e.which === 1 && !$button.is(e.target) && $button.has(e.target).length === 0) {
          $popup.hide()
        }
      })
    }, 0)
  }
}
</script>
