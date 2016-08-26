<template>

  <div class="ui stackable two column grid">
    <div class="ui column">

      <div class="ui extra content">
        <div class="ui header">Ogłoszenie</div>
      </div>

      <div class="ui fluid card">
                
        <div class="content">
          <img class="right floated mini ui image" src="../assets/plumber.png">
          <div class="ui header">
            {{anounce.title}}
          </div>
          <div class="meta">
            Jan Kowalski - {{anounce.city}} - {{anounce.state}}
          </div>
          <div class="description">
            {{anounce.description}}
          </div>
        </div>
        
        <div class="extra content">
            <div class="ui form">
              
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
                 
              <div class="field">
                <label>Podaj swój email lub telefon (możesz się także zalogować) </label>
                  <div class="ui icon input">
                    <i class="at icon"></i>
                    <input v-model="order.customerContactInfo" type="text"/>
                  </div>
              </div>     
                 
              <div class="ui two buttons">
                <input class="ui basic green button" type="submit" v-on:click="onOrder(anounce)" value="Zamów"/>
                <div class="ui basic red button" v-on:click="emitCloseEvent()">Anuluj</div>
              </div>
            </div>  
        </div>
       
      </div>
    
    </div>
    <div class="ui column">
    
      <div class="ui extra content">
        <div class="ui header">O użytkowniku</div>
        <user-public-profile :user=user></user-public-profile>
      </div>
    
    </div>
  </div>
  
  <div class="ui segments">
    <div class="ui segment">
      <a class="ui blue button" v-link="{ path: '/anounce', query: { anounceId: anounce.id }}" v-on:click="emitCloseEvent()">
        link bezpośrednio do oferty
      </a>
    </div>
    <div class="ui segment">
      #id oferty: {{anounce.id}}
    </div>
  </div>

</template>

<script>
import api from '../api'
import guid from '../guid'
import session from '../session'
import UserPublicProfile from './UserPublicProfile.vue'
const $ = require('jquery')
require('moment')
require('semantic-ui-daterangepicker')

export default {
  components: {
    UserPublicProfile
  },
  data () {
    return {
      anounce: {
        id: '',
        title: '',
        city: '',
        state: '',
        img: '',
        description: ''
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
        customerContactInfo: ''
      }
    }
  },
  methods: {
    onOrder: function (anonuce) {
      this.order.anounceId = anonuce.id
      api.order(this.order, session.getJwt(), (response) => {
        console.log('onOrder response -> ', response)
        this.$router.go({'path': '/order', 'query': {'orderId': this.order.requestId}})
        this.emitOrderEvent(this.order)
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
        username: 'X Y',
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
  }
}
</script>
