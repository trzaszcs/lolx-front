<template>
  <loading-box :show="loading"></loading-box>
  
  <div class="ui stackable two column grid">
    <div class="ui column">

      <div class="ui fluid card">
        
        <div class="ui left aligned extra content">
          <button v-on:click="emitCloseEvent()" class="ui stackable icon button " data-tooltip="wróć na poprzednią stronę">
            <i class="arrow left icon"></i>
          </button> 
          <b>Ogłoszenie</b>
        </div>

        <div class="content">
          
          <div class="ui left floated section">
          <div class="ui header">
            {{anounce.title}}
          </div>
          <div class="meta">
            Jan Kowalski - {{anounce.city}} - {{anounce.state}}
          </div>
</div>

   <div class="ui right floated section">
            <div class="ui large label">
             Cena {{anounce.price}} PLN
             </div>
          </div>
          </div>

<div class="content">
          <div class="description">
            <img class="ui left floated image" src="../assets/plumber.png">
            {{anounce.description}}
          </div>

        </div>
        
     

 
       
      </div>
    
    
    
    
    
           <div class="ui secondary segment">
       <div class="ui header">Formularz zamówienia</div>
          
            <div class="ui form" v-bind:class="{ 'error': validationErrors }">
              
             <div class="ui error message">
                <ul class="list" v-for="error in validationErrors">
                  <li>{{error.txt}}</li>
                </ul>
              </div>
              
              <div class="field">
                <label>Możesz wybrać preferowaną godzinę wykonania usługi</label>
                <select v-model="order.preferedTime" class="ui search dropdown">
                  <option value="">-</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select>
              </div>
              
              <div class="field">
                <label>oraz datę</label>
                  <div class="ui icon input">
                    <i class="calendar icon"></i>
                    <input v-model="order.preferedDate" type="text" id="daterange"/>
                  </div>
              </div>     
                 
                <div v-if="showLoginMessage" class="field" v-bind:class="{'error': hasFieldError('customerContactInfo')}">
                  <label>Podaj swój email lub telefon.</label>
                    <div class="ui icon input">
                      <i class="at icon"></i>
                      <input v-model="order.customerContactInfo" type="text" name="customerContactInfo"/>
                    </div>
                </div>    
                
                <div  v-if="showLoginMessage" class="ui message">
                    Nie jesteś zalogowany! <a v-link="{ path: '/login'}">Logowanie</a> nie jest wymagane 
                    by zamówić, ale dzięki logowaniu automatycznie wypełnimy dane i zapamiętamy twoje zamówienia.
                </div> 
                    

              <div class="ui two buttons">
                <input class="ui orange large button" type="submit" v-on:click="onOrder(anounce, $event)" value="Zamów"/>
                <div class="ui large button" v-on:click="emitCloseEvent()">Anuluj</div>
              </div>

              <div class="ui message">
              Zamówienie oznacza akceptację aktualnego <a v-link="{ path: '/terms' }">regulaminu</a> serwisu.
              </div>
              
            </div>  
        </div>
    
    
    
    
    
    
    
    
    
    
    
    </div>
    <div class="ui column">
        <user-public-profile :user=user></user-public-profile>
    </div>
  </div>
  
  <div class="ui segments">
    <div class="ui center aligned segment">
      <a v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
        link bezpośrednio do oferty: {{anounce.id}}
      </a>
    </div>
  </div>

</template>

<script>
import api from '../api'
import guid from '../guid'
import session from '../session'
import UserPublicProfile from './UserPublicProfile.vue'
import LoadingBox from './LoadingBox.vue'
const $ = require('jquery')
require('moment')
require('semantic-ui-daterangepicker')

export default {
  components: {
    UserPublicProfile,
    LoadingBox
  },
  data () {
    return {
      anounce: {
        id: '',
        title: '',
        city: '',
        state: '',
        img: '',
        description: '',
        price: ''
      },
      user: {
        username: 'lala',
        rating: 2,
        commentsCount: 0,
        likesCount: 0,
        lastActive: ''
      },
      order: {
        requestId: guid.getUuid(),
        anounceId: '',
        preferedTime: '',
        preferedDate: '',
        customerContactInfo: '',
        customerId: ''
      },
      loading: false,
      validationErrors: null,
      showLoginMessage: false
    }
  },
  methods: {
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (this.showLoginMessage && !this.order.customerContactInfo) {
        append('customerContactInfo', 'Podaj kontaktowy email lub zaloguj się')
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
    onOrder: function (anonuce, event) {
      event.preventDefault()
      if (!this.validate() && !session.logged()) {
        return
      }
      this.loading = true
      this.order.anounceId = anonuce.id
      if (session.logged()) {
        this.order.customerId = session.getUserId()
      }
      api.order(this.order, session.getJwt(), (response) => {
        console.log('onOrder response -> ', response)
        this.loading = false
        this.emitOrderEvent(this.order)
        this.$router.go({'path': '/order', 'query': {'orderId': this.order.requestId}})
      })
    },
    emitOrderEvent: function (order) {
      this.$dispatch('emitOrderEvent', order)
    },
    emitCloseEvent: function () {
      this.$dispatch('emitCloseEvent', {})
    },
    getUser: function (selectedItem) {
      return {
        username: 'Zbigniew ToDo',
        rating: 4,
        commentsCount: 2,
        likesCount: 1,
        lastActive: '12h'
      }
    }
  },
  events: {
    'showAnounce': function (selectedItem) {
      console.log('event show anounce card-> ', selectedItem.anounce)
      this.anounce = selectedItem.anounce
      this.user = this.getUser(selectedItem)
    }
  },
  ready: function () {
    $('#daterange').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoApply: true,
      locale: {
        format: 'MM-DD-YYYY'
      }
    })
    this.showLoginMessage = !session.logged()
  }
}
</script>
