<template>
  <div class="ui container chat">
    <div class="ui segment">
      <loading-box :show="loading"></loading-box>

      <h4 class="ui dividing header">Wiadomość w sprawie ogłoszenia: <a v-link="{ path: '/anounce', query: {anounceId: anounce.id} }">{{anounce.title}}</a></h4>

      <info-box :visible="msgAdded">
          <p>
            Wiadomość została wysłana
          </p>
      </info-box>
      
      <request-order v-if="anounceId" :anounce-id="anounceId"></request-order>

      <conversation v-if="messages" :messages="messages" :focused-message-id="lastUnreadMessageId"></conversation>

      <form class="ui form">
        <textarea v-model="msg" rows=2 placeholder="Wpisz wiadomość"></textarea>
        <button v-on:click="save($event)" class="ui teal button" v-bind:class="{ 'disabled': !msg }" value="Wyślij">
           <i class="icon mail outline"></i>
           Wyślij
        </button>
      </form>

    </div>
  </div>
</template>

<script>
import api from '../api'
import util from '../util'
import session from '../session'
import LoadingBox from '../components/LoadingBox.vue'
import InfoBox from '../components/InfoBox.vue'
import Conversation from './Conversation.vue'
import RequestOrder from './RequestOrder.vue'

const enrich = (chat) => {
  chat.messages = chat.messages.map(message => {
    message.authorsMessage = message.authorId === chat.authorId
    message.opponentsMessage = !message.authorsMessage
    message.message = message.type === 'user'
    message.creationDatePretty = util.prettyDateDetailed(new Date(message.created))
    message.authorPretty = message.authorId === session.getUserId() ? `Ty (${message.author})` : message.author
    return message
  })
  return chat
}

export default {
  components: {
    LoadingBox,
    InfoBox,
    Conversation,
    RequestOrder
  },
  data () {
    return {
      chatId: null,
      anounceId: null,
      anounce: {},
      msg: null,
      msgAdded: false,
      messages: null,
      requestOrderId: null,
      lastUnreadMessageId: null
    }
  },
  methods: {
    handleChatLoaded: function (chat) {
      this.messages = enrich(chat).messages
      this.lastUnreadMessageId = chat.firstUnreadMessageId ? chat.firstUnreadMessageId : this.messages[this.messages.length - 1].id
    },
    afterSave: function (anounceId) {
      this.msg = ''
    },
    save: function (event) {
      event.preventDefault()

      this.loading = true

      if (!this.chatId) {
        api.createChat(this.anounceId, this.requestOrderId, session.getJwt(), this.msg, (response) => {
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
    }
  },
  ready: function () {
    if (!session.logged()) {
      session.setBackUrl(this.$route)
      this.$router.go({path: '/login'})
      return
    }

    const loadAnounce = (anounceId) => {
      api.getById(anounceId, (response) => { this.anounce = response })
    }

    this.chatId = this.$route.query.chatId
    this.anounceId = this.$route.query.anounceId

    if (this.chatId) {
      // load chat
      this.loading = true
      api.getChat(this.chatId, session.getJwt(), (response) => {
        this.handleChatLoaded(response)
        this.loading = false
        this.anounceId = response.anounceId
        loadAnounce(this.anounceId)
      })
    } else if (this.anounceId) {
      api.getChatForAnounce(this.anounceId, session.getJwt(), (response) => {
        if (response) {
          this.chatId = response.id
          this.$router.go({query: {chatId: this.chatId}})
          this.handleChatLoaded(response)
        }
      })
      loadAnounce(this.anounceId)
    }
  },
  events: {
    'requestOrderFetched': function (event) {
      this.requestOrderId = event.id
    }
  }
}
</script>
