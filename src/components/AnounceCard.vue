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
            <div class="ten wide field">
              <label>Termin wykonania usługi</label>
                <div class="ui input">
                  <input type="text" id="daterange"/>
                 </div>
            </div>     
               
            <div class="ui two buttons">
              <input class="ui basic green button" type="submit" v-on:click="emitOrderEvent(anounce)" value="Zamów"/>
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
      }
    }
  },
  methods: {
    emitOrderEvent: function (anonuce) {
      this.$router.go({'path': '/order', 'query': {'anounceId': anonuce.id}})
      this.$dispatch('emitOrderEvent', anonuce)
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
    $('#daterange').daterangepicker()
  }
}
</script>
