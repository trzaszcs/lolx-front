<template>
  <div class="order ui container order">
    <loading-box :show="loading"></loading-box>
      
      <div v-if="requestOrderJustCreated" style="background-color:#95b32d;color:white;padding:20px;">
         <div class="ui header" style="color:white;">
          Twoje zamówienie zostało przyjęte
         </div>
         <p>
            Ogłoszeniodawca zostanie przez nas poinformowany o twoim zgłoszeniu i się z tobą skontaktuje. 
            W razie wątpliwości możesz skontaktować się z nim bezpośrednio.
          </p>
       </div>
      

    <div class="ui dividing header" style="padding-bottom:40px;padding-top:40px;color:gray;font-size:1.5em;">
      <i class="settings icon"></i>
      <div class="content">
          Karta zamówienia usługi
          <div class="sub header">
          <a v-link="{ path: '/anounce', query: { anounceId: requestOrder.anounceId }}">
            <b>{{anounce.title}}</b>
          </a>
        </div>
      </div>
    </div>



  <div class="ui stackable grid">
  <div class="four wide column" style="margin:10px;color:gray;font-size:1.2em;">
    <b>Dane zamówienia</b>
  </div>
  <div class="eight wide column">
    
          <table class="ui striped table">
              <tbody>
                <tr>
                  <td>Status</td>
                  <td>{{requestOrder.statusPretty}}</td>
                </tr>
                <tr>
                  <td>Data utworzenia</td>
                  <td>{{requestOrder.creationDatePretty}}</td>
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
            
            <div class="right floated action">
              <button v-if="requestOrder.deleteAllowed" v-on:click="deleteRequestOrder" class="ui right floated button">Usuń zamówienie</button>
              <button v-if="requestOrder.rejectAllowed" v-on:click="rejectRequestOrder" class="ui right floated button">Odrzuć</button>
              <button v-if="requestOrder.acceptAllowed" v-on:click="acceptRequestOrder" class="ui right floated button">Akceptuj</button>
            </div>
    
  </div>
</div>
    
<div class="ui stackable grid">
  <div class="four wide column" style="margin:10px;color:gray;font-size:1.2em;">
    <b>{{userLabel}}</b>
  </div>
  <div class="eight wide column">
    <user-public-profile></user-public-profile>
  </div>
</div>

</div>

</template>

<script>
import cache from './utils/cache'
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'
import UserPublicProfile from './components/UserPublicProfile.vue'
import {decorateRequestOrder} from './utils/requestOrderDecorator'

export default {
  components: {
    LoadingBox,
    UserPublicProfile
  },
  data () {
    return {
      requestOrder: {},
      anounce: {},
      loading: false,
      requestOrderJustCreated: false,
      chatStatus: undefined,
      userLabel: ''
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
      this.userLabel = session.getUserId() === this.requestOrder.anounceAuthorId ? 'Pracę wykona' : 'Pracę zlecił'
      this.$broadcast('loadUserRatingEvent', opponent, this.requestOrder.anounceId)
      api.getChatStatus(this.requestOrder.anounceId, opponent, session.getJwt(), (status) => {
        this.chatStatus = status
      })
    })
  }
}
</script>
