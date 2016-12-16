<template>
  <div class="order ui container">
    <loading-box :show="loading"></loading-box>
    
    <div class="ui stackable two column grid">
      <div class="column">

        <div class="ui icon success message">
          <i class="checkmark icon"></i>
          <p> </p>
           <div class="header">
            Twoje zamówienie zostało przyjęte
          </div>
        </div>
        
         <div class="ui icon message">
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
                    <td>Link bezpośrednio do ogłoszenia</td>
                    <td>
                      <a v-link="{ path: '/anounce', query: { anounceId: requestOrder.anounceId }}">{{anounce.title}}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button v-if="requestOrder.deleteAllowed" v-on:click="deleteRequestOrder" class="ui teal button">Usuń zamówienie</button>
          </div>
      </div>
  
    </div>
      
  </div>

</template>

<script>
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
      loading: false
    }
  },
  methods: {
    deleteRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz usunąć zamówienie?')) {
        api.removeRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          window.history.back()
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
    this.loading = true
    const orderId = this.$route.query.orderId
    api.getRequestOrder(orderId, session.getJwt(), (response) => {
      this.requestOrder = decorateRequestOrder(response, session.getUserId())
      api.getById(this.requestOrder.anounceId, (anounce) => {
        this.anounce = anounce
        this.loading = false
      })
    })
  }
}
</script>
