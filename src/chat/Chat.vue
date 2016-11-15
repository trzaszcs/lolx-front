<template>
  <div class="ui container chat">
    <div class="ui segment">
      <loading-box :show="loading"></loading-box>

      <h4 class="ui dividing header">Wyślij wiadomość</h4>
      <h5>Pytanie w sprawie ogłoszenia: <a target="_blank" v-link="{ path: '/anounce', query: {anounceId: anounce.ownerId} }">{{anounce.title}}</a></h2>

      <info-box :visible="msgAdded" :header="'Chat'">
          <p>
            Twoja wiadomość została wysłana
          </p>
      </info-box>

      <form class="ui form" v-bind:class="{ 'error': validationErrors }">
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

const enrichMessages = (messages, leftSideUserId) => {
  return messages.map(message => {
    message.leftSide = message['author-id'] === leftSideUserId
    return message
  })
}

const leftSideUserId = (chat, currentUserId) => {
  return chat['author-id'] === currentUserId ? currentUserId : chat['anounce-author-id']
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
    afterSave: function (anounceId) {
      this.msg = ''
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.loading = true

      if (!this.chatId) {
        api.createChat(this.anounceId, session.getJwt(), this.msg, (response) => {
          this.chatId = response.id
          this.msgAdded = true
          api.getChat(this.chatId, session.getJwt(), (response) => {
            this.leftSideUserId = leftSideUserId(response, session.getUserId())
            this.messages = enrichMessages(response.messages, this.leftSideUserId)
            this.afterSave()
            this.loading = false
          })
        })
      } else {
        api.appendMessage(this.chatId, session.getJwt(), this.msg, (response) => {
          this.msgAdded = true
          api.getChat(this.chatId, session.getJwt(), (response) => {
            this.messages = enrichMessages(response.chat.messages, this.leftSideUserId)
            this.afterSave()
            this.loading = false
          })
        })
      }
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.msg) {
        append('msg', 'Wiadomość jest wymagana')
      }

      if (errors.length > 0) {
        this.validationErrors = errors
        return false
      }
      return true
    },
    hasFieldError: function (fieldName) {
      if (this.validationErrors) {
        return this.validationErrors.some((errorMessage) => {
          return errorMessage.name === fieldName
        })
      }
      return false
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
        this.leftSideUserId = leftSideUserId(response, session.getUserId())
        this.messages = enrichMessages(response.messages, this.leftSideUserId)
        this.loading = false
      })
    } else {
      // new chat
    }

    api.getById(this.anounceId, (response) => { this.anounce = response })
  }
}
</script>
