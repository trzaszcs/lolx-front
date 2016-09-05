<template>
  <div class="order ui container">
    <loading-box :show="loading"></loading-box>
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
                  <a v-link="{ path: '/order', query: { orderId: order.requestId }}">moje zamowienie</a>
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
                  <a v-link="{ path: '/anounce', query: { anounceId: order.anounceId }}">oferta: {{order.anounceId}}</a>
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
  
  
  
  <div class="ui segments">
    <div class="ui segment">
      <b>Zarządzaj kartą</b>
    </div>
    <div class="ui secondary segment">
      <div class="ui segment">
        <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      
          <div class="ui error message">
            <ul class="list" v-for="error in validationErrors">
              <li>{{error.txt}}</li>
            </ul>
          </div>
          
          <div class="six wide field desktop ten wide mobile required" v-bind:class="{'error': hasFieldError('email')}">
              <label>Wyślij kartę na adres email</label>
              <input v-model="orderEmail.email" type="text" name="email" placeholder="email"/>
          </div>

          <button v-on:click="sendOrder($event)" type="submit" class="ui action right button" >Wyślij</button>
        </form>
      </div>
    </div>
  </div>
  
    <div class="ui small modal">
      <div class="content">
        Przesłalismy kartę na wybrany adres
      </div>
    </div>  
      
  </div>

</template>

<script>
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'
import $ from 'jquery'

export default {
  components: {
    LoadingBox
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
      },
      validationErrors: null,
      orderEmail: {
        email: '',
        anounceId: ''
      },
      loading: false
    }
  },
  methods: {
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.orderEmail.email) {
        append('email', 'Podaj email')
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
    },
    sendOrder: function (event) {
      event.preventDefault()
      if (!this.validate()) {
        return
      }
      this.loading = true
      this.orderEmail.anounceId = this.order.anounceId
      api.sendOrderEmail(this.orderEmail, session.getJwt(), (result) => {
        if (result.success) {
          $('.ui.modal').modal('show')
        }
        this.loading = false
      })
    }
  },
  ready: function () {
    this.loading = true
    const orderId = this.$route.query.orderId
    console.log(orderId)
    api.getOrder(orderId, session.getJwt(), (order) => {
      console.log('response -> ', order)
      this.order = order
      this.loading = false
    })
  }
}
</script>
