<template>
  <loading-box :show="loading"></loading-box>
  
  <div class="ui stackable two column grid" style="padding-left:5px;padding-right:5px;background-color:#F5F5F5;">
    <div class="ui column">
<div class="anounceCard">
  
        <div class="date">
          Dodano {{creationDate()}}  
          <a v-on:click="addToFavorites()" class="ui icon" data-tooltip="dodaj do ulubionych">
              <i class="ui star icon" style="color:#95b32d"></i>
          </a> 
        </div>
          
        <div class="title">
              <i class="ui announcement icon"></i>
              {{anounce.title}}
        </div>

        <div class="ui divider" style="color:gray;"></div>

         
           <div class="ui fluid two column grid">
    <div class="ui ten wide left floated left aligned column">
              <div class="ui section">
          <div class="meta">
            {{anounce.location.title}}
          </div>
           <p></p>
          <a v-link="{ path: '/userAnounces', query: {id: anounce.ownerId} }" data-tooltip="Więcej ogłoszeń tego użytkownika">
            <i class="ui shopping bag icon"></i>
            Ogłoszenia użytkownika ...
          </a>
          <br/>
          <a v-if="chatStatus" v-link="{ path: '/chat', query: {anounceId: anounce.id, chatId: chatStatus.id} }" data-tooltip="Przejdź do konwersacji">
            <i class="ui talk outline icon"></i>
            Przejdź do konwersacji
          </a>
          <a v-else v-link="{ path: '/chat', query: {anounceId: anounce.id} }" data-tooltip="Zadaj pytanie autorowi">
            <i class="ui talk outline icon"></i>
            Zapytaj o ofertę
          </a>
          
        </div>
         </div>

             <div class="ui six wide right floated left aligned column ">
               
        <div class="ui section">
            <h2 class="ui header">
              Cena
              <div class="sub header">{{anounce.price}} zł</div>
            </h2>

            <button v-if="requestOrderId"  class="ui button tiny"  v-link="{ path: '/order', query: {orderId: requestOrderId} }">
              <i class="ui add to cart icon"></i>
              Twoje zamówienie
            </button>

            <button v-if="!requestOrderId"  class="ui button"  v-on:click="requestOrder()">
              <i class="ui add to cart icon"></i>
              Zamów
            </button>

        </div>
         </div>

         </div>

<h4 class="ui horizontal divider header" style="color:gray;">
  Opis
</h4>

       <div class="ui section" id="anounce-desc"> 
            <img class="ui left floated small spaced image" :src="getImg()">
            {{anounce.description}}
        </div>


          <a v-on:click="emitCloseEvent()" class="ui icon" data-tooltip="wróć na poprzednią stronę">
            <i class="ui left arrow icon"></i>
            wstecz
          </a>


</div>
  
    </div>
    <div class="ui column">
        <user-public-profile :showVotePanel=true></user-public-profile>
      
      <div class="anounceCard">
        <div class="ui header localization">
          <i class="marker icon"></i>Lokalizacja ogłoszenia 
        </div>
        <div  id="map"> </div>
      </div>

    </div>
  </div>
  
    <div class="ui fluid section " style="text-align:center;color:white;padding:20px;margin-top:20px;">
      <a v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
        link bezpośrednio do oferty: {{anounce.id}}
      </a>
    </div>

  <div class="ui modal" id="confirm">
    <div class="ui segment">
      <div class="ui icon message">
        <i class="inbox icon"></i>
        <div class="content">
          <div class="ui header">
            Proszę potwierdzić zamówienie
          </div>
          <a v-link="{ path: '/anounce', query: { anounceId: anounce.id }}" target="_blank">
            {{anounce.title}}
          </a>
        </div>
      </div>
      <div class="ui two buttons">
        <input class="ui button" v-on:click="closeConfirm()" value="Anuluj"/>
        <input class="ui teal button" v-on:click="confirmRequestOrder()" value="Zamawiam"/>
      </div>
    </div>
  </div>

</template>

<script>
import cache from '../utils/cache'
import api from '../api'
import guid from '../guid'
import util from '../util'
import session from '../session'
import UserPublicProfile from './UserPublicProfile.vue'
import LoadingBox from './LoadingBox.vue'
const $ = require('jquery')
require('moment')
require('semantic-ui-daterangepicker')
const gmAPI = require('google-maps')

const showRequestOrderConfirm = () => {
  $('.ui.modal').modal('show')
}

const hideRequesOrderConfirm = () => {
  $('.ui.modal').modal('hide')
}

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
        price: '',
        creationDate: null,
        location: {
          latitude: 52.4064,
          longitude: 16.9252
        }
      },
      user: {
        username: 'lala',
        commentsCount: 0
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
      showLoginMessage: false,
      creationDate: function () {
        return this.anounce.creationDate
          ? util.prettyDate(this.anounce.creationDate)
          : null
      },
      chatStatus: null,
      showRequestOrderCreatedMsg: false,
      requestOrderId: null,
      requestOrderAllowed: false,
      requestOrderRemoveAllowed: false
    }
  },
  methods: {
    closeConfirm: function () {
      hideRequesOrderConfirm()
    },
    emitOrderEvent: function (order) {
      this.$dispatch('emitOrderEvent', order)
    },
    emitCloseEvent: function () {
      this.$dispatch('emitCloseEvent', {})
    },
    getUser: function (selectedItem) {
      return {
        username: 'Zbigniew ToDo'
      }
    },
    initMap: function () {
      const isDraggable = $(document).width() > 640
      const latitude = this.anounce.location.latitude
      const longitude = this.anounce.location.longitude
      gmAPI.KEY = 'AIzaSyCHNx3_Bwnpapv_k2jjKqiGcti6GD1Jy6Q'
      gmAPI.load(function (google) {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          scrollwheel: false,
          draggable: isDraggable,
          zoom: 12
        })
        console.log(map)
      })
    },
    getImg: function () {
      return this.anounce.img ? this.anounce.img : 'https://semantic-ui.com/images/wireframe/image.png'
    },
    requestOrder: function () {
      if (session.logged()) {
        showRequestOrderConfirm()
      } else {
        cache.put('orderRequest', true)
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
      }
    },
    confirmRequestOrder: function () {
      this.loading = true
      api.requestOrder(this.anounce.id, session.getJwt(), (response) => {
        hideRequesOrderConfirm()
        this.loadig = false
        cache.put('requestOrderJustCreated', true)
        this.$router.go({'path': '/order', 'query': {'orderId': response.id}})
      })
    }
  },
  events: {
    'showAnounce': function (selectedItem) {
      console.log('event show anounce card-> ', selectedItem.anounce)
      this.anounce = selectedItem.anounce
      this.$broadcast('loadUserRatingEvent', this.anounce.ownerId, this.anounce.id)
      this.initMap()

      this.requestOrderAllowed = true
      this.requestOrderRemoveAllowed = false
      if (session.logged()) {
        if (cache.getAndClear('orderRequest')) {
          showRequestOrderConfirm()
        }
        if (session.getUserId() !== this.anounce.ownerId) {
          api.getChatStatus(this.anounce.id, this.anounce.ownerId, session.getJwt(), (chat) => {
            if (chat) {
              this.chatStatus = chat
            }
          })
          api.getRequestOrderForAnounce(this.anounce.id, session.getJwt(), (requestOrder) => {
            if (requestOrder) {
              this.requestOrderAllowed = false
              this.requestOrderRemoveAllowed = true
              this.requestOrderId = requestOrder.id
            } else {
              this.requestOrderAllowed = true
              this.requestOrderRemoveAllowed = false
            }
          })
        } else {
          this.requestOrderAllowed = false
          this.requestOrderRemoveAllowed = false
        }
      }
    }
  },
  ready: function () {
    this.showLoginMessage = !session.logged()
  }
}
</script>
