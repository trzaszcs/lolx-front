<template>
  <div class="ui container chat">
    <div class="ui segment">
      <loading-box :show="loading"></loading-box>

      <h4 class="ui dividing header">Wyślij wiadomość</h4>

      <a v-on:click="goToOffer()" class="ui icon" data-tooltip="wróć do oferty">
        <i class="ui left arrow icon"></i>
        wróć do oferty
      </a>

      <info-box :visible="msgAdded">
          <p>
            Wiadomość została wysłana
          </p>
      </info-box>

      <h5>Pytanie w sprawie ogłoszenia: <a target="_blank" v-link="{ path: '/anounce', query: {anounceId: anounce.id} }">{{anounce.title}}</a></h2>


      <form class="ui form">
        <textarea v-model="msg" rows=2 placeholder="Wpisz wiadomość"></textarea>
        <input v-on:click="save($event)" type="submit" class="ui teal button" v-bind:class="{ 'disabled': !msg }" value="Wyślij"></input>
      </form>

      <conversation v-if="messages" :messages="messages"></conversation>

    </div>
  </div>
</template>

<script>
import api from '../api'
import session from '../session'
import LoadingBox from '../components/LoadingBox.vue'
import InfoBox from '../components/InfoBox.vue'
import Conversation from './Conversation.vue'

const enrich = (chat) => {
  chat.messages = chat.messages.map(message => {
    message.isAuthor = message.authorId === chat.authorId
    message.isOpponent = message.isAuthor
    return message
  })
  return chat
}

export default {
  components: {
    LoadingBox,
    InfoBox,
    Conversation
  },
  data () {
    return {
      chatId: null,
      anounceId: null,
      anounce: {},
      msg: null,
      msgAdded: false,
      messages: null,
      leftSideUserId: null
    }
  },
  methods: {
    handleChatLoaded: function (chat) {
      this.messages = enrich(chat).messages
    },
    afterSave: function (anounceId) {
      this.msg = ''
    },
    save: function (event) {
      event.preventDefault()

      this.loading = true

      if (!this.chatId) {
        api.createChat(this.anounceId, session.getJwt(), this.msg, (response) => {
          this.chatId = response.id
          this.$router.go({query: {...this.$route.query, chatId: this.chatId}})
          this.msgAdded = true
          api.getChat(this.chatId, session.getJwt(), (response) => {
            this.handleChatLoaded(response)
            this.afterSave()
            this.loading = false
          })
        })
      } else {
        api.appendMessage(this.chatId, session.getJwt(), this.msg, (response) => {
          this.msgAdded = true
          api.getChat(this.chatId, session.getJwt(), (response) => {
            this.handleChatLoaded(response)
            this.afterSave()
            this.loading = false
          })
        })
      }
    },
    goToOffer: function () {
      this.$router.go({path: '/anounce', query: {anounceId: this.anounceId}})
    }
  },
  ready: function () {
    if (!session.logged()) {
      session.setBackUrl(this.$route)
      this.$router.go({path: '/login'})
      return
    }

    this.chatId = this.$route.query.chatId
    this.anounceId = this.$route.query.anounceId

    if (this.chatId) {
      // load chat
      this.loading = true
      api.getChat(this.chatId, session.getJwt(), (response) => {
        this.handleChatLoaded(response)
        this.loading = false
      })
    } else {
      api.getUserChat(this.anounceId, session.getJwt(), (response) => {
        if (response) {
          this.chatId = response.id
          this.$router.go({query: {chatId: this.chatId}})
          this.handleChatLoaded(response)
        }
      })
    }

    api.getById(this.anounceId, (response) => { this.anounce = response })
  }
}
</script>