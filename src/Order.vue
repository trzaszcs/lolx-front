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
                    <b>{{order.title}}</b>
                </a>
              </div>
            
              <table class="ui celled striped table">
                <tbody>
                  <tr>
                    <td>
                      <div class="ui ribbon label">Identyfikator Twojego zamówienia</div>
                    </td>
                    <td>
                      <a v-link="{ path: '/order', query: { orderId: order.requestId }}">{{order.requestId}}</a>
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
    <div class="column">

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
                
                <div class="eight wide desktop ten wide mobile field required" v-bind:class="{'error': hasFieldError('email')}">
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
        title: '',
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
        anounceId: '',
        orderId: ''
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
      this.orderEmail.orderId = this.order.requestId
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
