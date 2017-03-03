<template>
  <div class="order ui container">
    <loading-box :show="loading"></loading-box>
    
    <div class="ui stackable two column grid">
      <div class="column">

        <div v-if="requestOrderJustCreated" class="ui icon success message">
          <i class="checkmark icon"></i>
          <p> </p>
           <div class="header">
            Twoje zamówienie zostało przyjęte
          </div>
        </div>
        
         <div v-if="requestOrderJustCreated" class="ui icon message">
          <i class="info icon"></i>
          <div class="content">
            Ogłoszeniodawca zostanie przez nas poinformowany o twoim zgłoszeniu i się z tobą skontaktuje. 
            W razie wątpliwości możesz skontaktować się z nim bezpośrednio.</p>
          </div>
        </div>
        
      <div class="ui fluid card">
          <div class="content">
            <div class="header">Karta zamówienia usługi</div>
            
            <div class="description">
              <a v-link="{ path: '/anounce', query: { anounceId: requestOrder.anounceId }}">
                <b>{{anounce.title}}</b>
              </a>
            </div>

            <div class="action">
              <button v-if="requestOrder.deleteAllowed" v-on:click="deleteRequestOrder" class="ui teal tiny button">Usuń zamówienie</button>
              <button v-if="requestOrder.rejectAllowed" v-on:click="rejectRequestOrder" class="ui teal tiny button">Odrzuć</button>
              <button v-if="requestOrder.acceptAllowed" v-on:click="acceptRequestOrder" class="ui teal tiny button">Akceptuj</button>
            </div>

              <table class="ui celled striped table">
                <tbody>
                  <tr>
                    <td>
                      <div class="ui ribbon label">Identyfikator Twojego zamówienia</div>
                    </td>
                    <td>
                      <a v-link="{ path: '/order', query: { orderId: requestOrder.id }}">{{requestOrder.id}}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{{requestOrder.statusPretty}}</td>
                  </tr>
                  <tr>
                    <td>Data utworzenia</td>
                    <td>{{requestOrder.creationDatePretty}}</td>
                  </tr>
                  <tr>
                    <td>Autor</td>
                    <td>{{requestOrder.authorName}}</td>
                  </tr>
                  <tr>
                    <td>Link bezpośrednio do ogłoszenia</td>
                    <td>
                      <a v-link="{ path: '/anounce', query: { anounceId: requestOrder.anounceId }}">{{anounce.title}}</a>
                    </td>
                  </tr>
                  <tr v-if="chatStatus == null">
                    <td>Rozpocznij rozmowę</td>
                    <td>
                      <a v-link="{ path: '/chat', query: { anounceId: requestOrder.anounceId , requestOrderId: requestOrder.id}}">Rozpocznij</a>
                    </td>
                  </tr>
                  <tr v-if="chatStatus">
                    <td>Kontynuuj rozmowę</td>
                    <td>
                      <div class="ui compact menu">
                        <a class="item" v-if="chatStatus.unreadMessages > 0" v-link="{ path: '/chat', query: { chatId: chatStatus.id}}">
                          <i class="icon mail"></i> Wiadomości
                          <div class="floating ui red label">{{chatStatus.unreadMessages}}</div>
                        </a>
                        <a class="item" v-else v-link="{ path: '/chat', query: { chatId: chatStatus.id}}">
                          <i class="icon mail"></i> Rozmowa
                        </a>
                      </div>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
      </div>
  
    </div>
      
  </div>
  
  
  

</template>

<script>
import cache from './utils/cache'
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'
import {decorateRequestOrder} from './utils/requestOrderDecorator'

export default {
  components: {
    LoadingBox
  },
  data () {
    return {
      requestOrder: {},
      anounce: {},
      loading: false,
      requestOrderJustCreated: false,
      chatStatus: undefined
    }
  },
  methods: {
    loadRequestOrder (onSuccess) {
      this.loading = true
      const orderId = this.$route.query.orderId
      api.getRequestOrder(orderId, session.getJwt(), (response) => {
        this.requestOrder = decorateRequestOrder(response, session.getUserId())
        onSuccess()
      })
    },
    deleteRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz usunąć zamówienie?')) {
        api.removeRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          window.history.back()
        })
      }
    },
    rejectRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz odrzucić zamówienie?')) {
        api.rejectRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          this.loadRequestOrder(() => { this.loading = false })
        })
      }
    },
    acceptRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz zaakceptować zamówienie?')) {
        api.acceptRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          this.loadRequestOrder(() => { this.loading = false })
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
    this.requestOrderJustCreated = cache.getAndClear('requestOrderJustCreated')
    this.loadRequestOrder(() => {
      api.getById(this.requestOrder.anounceId, (anounce) => {
        this.anounce = anounce
        this.loading = false
      })
      const opponent = session.getUserId() === this.requestOrder.authorId ? this.requestOrder.anounceAuthorId : this.requestOrder.authorId
      api.getChatStatus(this.requestOrder.anounceId, opponent, session.getJwt(), (status) => {
        this.chatStatus = status
      })
    })
  }
}
</script>
