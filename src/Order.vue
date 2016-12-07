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
                     <a v-link="{ path: '/anounce', query: { anounceId: order.anounceId }}">
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
                      <a v-link="{ path: '/order', query: { orderId: order.id }}">{{order.id}}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Dodatkowe informacje od ogłoszeniodawcy</td>
                    <td>{{order.accepted}}</td>
                  </tr>
                  <tr>
                    <td>link bezpośrednio do ogłoszenia</td>
                    <td>
                      <a v-link="{ path: '/anounce', query: { anounceId: order.anounceId }}">{{order.anounceId }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
    
          </div>
      </div>
  
    </div>
      
  </div>

</template>

<script>
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'

export default {
  components: {
    LoadingBox
  },
  data () {
    return {
      order: {},
      anounce: {},
      loading: false
    }
  },
  methods: {
  },
  ready: function () {
    this.loading = true
    const orderId = this.$route.query.orderId
    api.getRequestOrder(orderId, session.getJwt(), (order) => {
      api.getById(order.anounceId, (anounce) => {
        this.anounce = anounce
        this.loading = false
      })
    })
  }
}
</script>
