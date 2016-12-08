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
                    <td>{{requestOrder.statusText}}</td>
                  </tr>
                  <tr>
                    <td>Data utworzenia</td>
                    <td>{{requestOrder.creationDate}}</td>
                  </tr>
                  <tr>
                    <td>Link bezpośrednio do ogłoszenia</td>
                    <td>
                      <a v-link="{ path: '/anounce', query: { anounceId: requestOrder.anounceId }}">{{anounce.title}}</a>
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
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'

const translateStatus = (status) => {
  if (status === 'WAITING') {
    return 'Oczekiwanie na akceptację'
  } else if (status === 'ACCEPTED') {
    return 'Zaakceptowany'
  } else {
    return status
  }
}

const enrichRequestOrder = (requestOrder) => {
  return {...requestOrder, statusText: translateStatus(requestOrder.status)}
}

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
      this.requestOrder = enrichRequestOrder(response)
      api.getById(this.requestOrder.anounceId, (anounce) => {
        this.anounce = anounce
        this.loading = false
      })
    })
  }
}
</script>
