<template>
  <div class="order ui container">
    
    <div class="ui icon message">
      <i class="info icon"></i>
      <div class="content">
        <p>Ogłoszeniodawca zostanie przez nas poinformowany o twoim zgłoszeniu i się z tobą skontaktuje. 
      W razie wątpliwości możesz skontaktować się z nim bezpośrednio.</p>
      </div>
    </div>
    
  <div class="ui fluid card">
      <div class="content">
        <div class="header">Karta zamówienia</div>
        
          <table class="ui celled striped table">
            <tbody>
              <tr>
                <td>
                  <div class="ui ribbon label">Identyfikator Twojego zamówienia</div>
                </td>
                <td>{{order.requestId}}</td>
              </tr>
              <tr>
                <td>Bezpośredni link do zamówienia</td>
                <td>
                  <a v-link="{ path: '/order', query: { orderId: order.requestId }}">link</a>
                </td>
              </tr>
              <tr>
                <td>Dodatkowe informacje od ogłoszeniodawcy</td>
                <td>{{order.status.anounceContactInfo}}</td>
              </tr>
              <tr>
                <td>Wybrane przez Ciebie dodatkowe preferencje, które przekazaliśmy ogłoszeniodawcy</td>
                <td>
                    <p>czas wykonania usługi: {{order.preferedTime}}</p>
                    <p>data: {{order.preferedDate}}</p>
                </td>
              </tr>
              <tr>
                <td>link bezpośrednio do oferty</td>
                <td>
                  <a v-link="{ path: '/anounce', query: { anounceId: order.anounceId }}">link</a>
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
