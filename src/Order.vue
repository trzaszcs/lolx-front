<template>
  <div class="order ui container">
    <div class="ui fluid card">
      
      <div class="content">
        <div class="ui header">
          Ogłoszeniodawca zostanie przez nas poinformowany o twoim zgłoszeniu i się z tobą skontaktuje. 
          W razie wątpliwości możesz skontaktować się z nim bezpośrednio:
        </div>
        <div class="meta">
          {{order.requestId}}
        </div>
        <div class="description">
           {{order.status.anounceContactInfo}}
        </div>
      </div>
      
      <div class="extra content">
        <div class="ui header">Wybrane dodatkowe preferencje, które przekazaliśmy ogłoszeniodawcy</div>
         czas wykonania usługi: {{order.preferedTime}}, data: {{order.preferedDate}}
      </div>
    
      <div class="extra content">
        <a class="ui blue button" v-link="{ path: '/anounce', query: { anounceId: order.anounceId }}">
          link bezpośrednio do oferty
        </a>
      </div>
    
     <div class="extra content">
        #id: {{order.requestId}}
     </div>
  </div>
  
  </div>

</template>

<script>
import api from './api'
import session from './session'

export default {
  components: {
  },
  data () {
    return {
      order: {
        requestId: '',
        anounceId: '',
        preferedTime: '',
        preferedDate: '',
        customerContactInfo: '',
        status: {
          status: '',
          requestDate: '',
          anounceContactInfo: ''
        }
      }
    }
  },
  methods: {
  },
  ready: function () {
    const orderId = this.$route.query.orderId
    console.log(orderId)
    api.getOrder(orderId, session.getJwt(), (order) => {
      console.log('response -> ', order)
      this.order = order
    })
  }
}
</script>
