<template>
  <div class="ui container chat">
      <loading-box :show="loading"></loading-box>

      <div style="color:gray;font-size:1.5em;font-weight:bold;padding-bottom:10px;">Wiadomość w sprawie ogłoszenia</div>
      <a v-link="{ path: '/anounce', query: {anounceId: anounce.id} }" style="font-size:1.4em;">{{anounce.title}}</a>
      <div class="ui divider" style="color:gray;margin-bottom:20px;"></div>


      <info-box :visible="msgAdded">
          <p>
            Wiadomość została wysłana
          </p>
      </info-box>
      
      <request-order v-if="requestOrder !== undefined" :request-order="requestOrder" :anounce-author="anounceAuthor">
      </request-order>

      <conversation v-if="messages" :messages="messages" :focused-message-id="lastUnreadMessageId"></conversation>

      <form class="ui form">
        <textarea id="inputmsg" v-model="msg" rows=2 placeholder="Wpisz wiadomość"></textarea>
        <button v-on:click="save($event)" class="ui right floated button" v-bind:class="{ 'disabled': !msg }" value="Wyślij">
           <i class="icon mail outline"></i>
           Wyślij
        </button>
      </form>

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
import {decorateRequestOrder} from '../utils/requestOrderDecorator'

const enrich = (chat) => {
  chat.messages = chat.messages.map(message => {
    message.authorsMessage = message.authorId === chat.authorId
    message.opponentsMessage = !message.authorsMessage
    message.message = message.type === 'user'
    message.creationDatePretty = util.prettyDateDetailed(message.created)
    message.authorPretty = message.authorId === session.getUserId() ? 'Ja' : message.author
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
      loading: false,
      chatId: null,
      anounceId: null,
      anounce: {},
      msg: null,
      msgAdded: false,
      messages: null,
      requestOrder: undefined,
      lastUnreadMessageId: null,
      anounceAuthor: false
    }
  },
  methods: {
    handleChatLoaded: function (chat) {
      this.messages = enrich(chat).messages
      this.anounceAuthor = session.getUserId() === chat.anounceAuthorId
      this.lastUnreadMessageId = chat.firstUnreadMessageId ? chat.firstUnreadMessageId : this.messages[this.messages.length - 1].id
    },
    afterSave: function (anounceId) {
      this.msg = ''
    },
    save: function (event) {
      event.preventDefault()

      this.loading = true

      if (!this.chatId) {
        api.createChat(this.anounceId, this.anounce.ownerId, session.getJwt(), this.msg, (response) => {
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
    loadRequestOrderById: function (id) {
      api.getRequestOrder(id, session.getJwt(), (requestOrder) => {
        this.requestOrder = decorateRequestOrder(requestOrder, session.getUserId())
      })
    }
  },
  ready: function () {
    if (!session.logged()) {
      session.setBackUrl(this.$route)
      this.$router.go({path: '/login'})
      return
    }

    const loadAnounce = (anounceId, onSuccess) => {
      api.getById(anounceId, (response) => {
        this.anounce = response
        onSuccess(this.anounce)
      })
    }

    this.chatId = this.$route.query.chatId
    this.anounceId = this.$route.query.anounceId
    const requestOrderId = this.$route.query.requestOrdeId

    const loadAnounceWithChat = (anounceId, opponent) => {
      loadAnounce(anounceId, (anounce) => {
        api.getChatForAnounce(this.anounceId, opponent || anounce.ownerId, session.getJwt(), (response) => {
          if (response) {
            this.chatId = response.id
            this.$router.go({query: {chatId: this.chatId}})
            this.handleChatLoaded(response)
          }
        })
      })
    }

    const loadRequestOrderByAnounceId = (anounceId) => {
      api.getRequestOrderForAnounce(this.anounceId, session.getJwt(), (response) => {
        this.requestOrder = response ? decorateRequestOrder(response, session.getUserId()) : null
      })
    }

    if (requestOrderId) {
      api.getRequestOrder(requestOrderId, session.getJwt(), (requestOrder) => {
        this.requestOrder = requestOrder
        this.anounceId = requestOrder.anounceId
        loadAnounceWithChat(this.anounceId, requestOrder.authorId === session.getUserId() ? requestOrder.anounceAuthorId : requestOrder.authorId)
      })
    } else if (this.chatId) {
      // load chat
      this.loading = true
      api.getChat(this.chatId, session.getJwt(), (response) => {
        this.handleChatLoaded(response)
        this.loading = false
        this.anounceId = response.anounceId
        loadAnounce(this.anounceId, () => {})
        loadRequestOrderByAnounceId(this.anounceId)
      })
    } else if (this.anounceId) {
      loadAnounceWithChat(this.anounceId, null)
      loadRequestOrderByAnounceId(this.anounceId)
    }
  },
  events: {
    'loadRequestOrder': function (event) {
      this.loading = true
      api.getRequestOrder(event.id, session.getJwt(), (requestOrder) => {
        this.requestOrder = requestOrder
        this.loading = false
      })
    },
    'removeRequestOrder': function (event) {
      this.loading = true
      api.removeRequestOrder(event.id, session.getJwt(), () => {
        this.requestOrder = null
        this.loading = false
      })
    },
    'rejectRequestOrder': function (event) {
      this.loading = true
      api.rejectRequestOrder(event.id, session.getJwt(), () => {
        this.loadRequestOrderById(event.id)
        this.loading = false
      })
    },
    'acceptRequestOrder': function (event) {
      this.loading = true
      api.acceptRequestOrder(event.id, session.getJwt(), () => {
        this.loadRequestOrderById(event.id)
        this.loading = false
      })
    },
    'createRequestOrder': function (event) {
      this.loading = true
      api.requestOrder(this.anounceId, session.getJwt(), (response) => {
        this.loadRequestOrderById(response.id)
        this.loading = false
      })
    }
  }
}
</script>
