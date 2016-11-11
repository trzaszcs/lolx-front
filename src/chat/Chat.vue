<template>
  <div class="ui container chat">
    <div class="ui segment">
      <loading-box :show="loading"></loading-box>
   
      <form class="ui form" v-bind:class="{ 'error': validationErrors }">
        <h4 class="ui dividing header">Wyślij wiadomość</h4>

        <info-box :visible="msgAdded">
          <p>
            Twoja wiadomość została wysłana
          </p>
        </info-box>

        <div class="three wide field required" v-bind:class="{'error': hasFieldError('msg')}">
          <textarea v-model="msg">
          </textarea>
        </div>

        <input v-on:click="save($event)" type="submit" class="ui teal button" value="Wyślij"></input>
      </form>

      <conversation :messages="messages"></conversation>

    </div>
  </div>
</template>

<script>
import api from '../api'
import session from '../session'
import LoadingBox from '../components/LoadingBox.vue'
import InfoBox from '../components/InfoBox.vue'
import Conversation from './Conversation.vue'

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
      msg: null,
      msgAdded: false,
      messages: []
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
          this.chatId = response.chatId
          this.msgAdded = true
          api.getChat(this.chatId, session.getJwt(), (response) => {
            this.messages = response.chat.messages
            this.afterSave()
            this.loading = false
          })
        })
      } else {
        api.appendMessage(this.chatId, session.getJwt(), this.msg, (response) => {
          this.msgAdded = true
          api.getChat(this.chatId, session.getJwt(), (response) => {
            this.messages = response.chat.messages
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
        this.messages = response.chat.messages
        this.loading = false
      })
    } else {
      // new chat
    }
  }
}
</script>
