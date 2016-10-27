<template>
  <div class="ui container myAccount">
    
    <loading-box :show="loading"></loading-box>

    <div class="ui secondary stackable pointing menu">
      <a class="item" v-bind:class="{'active': view == 'publicData'}" @click="select('publicData')">
        Dane publiczne
      </a>
      <a class="item" v-bind:class="{'active': view == 'orders'}" @click="select('orders')">
        Kupione
      </a>
      <a class="item" v-bind:class="{'active': view == 'sold'}" @click="select('sold')">
        Sprzedane
      </a>
      <a class="item" v-bind:class="{'active': view == 'account'}" @click="select('account')">
        Konto
      </a>
      <a class="item" v-bind:class="{'active': view == 'changePassword'}" @click="select('changePassword')">
        Zmiana Hasła
      </a>
      <div class="right menu" @click="logout">
        <a class="ui item">
          Wyloguj
        </a>
      </div>
    </div>

     <!-- PUBLIC ACCOUNT -->
     <div v-show="view == 'publicData'">

          <div class="ui message">
             <div class="header">
               Dane Publiczne
             </div>
             <div class="content">
               Tu możesz zobaczyć jak widzą Ciebie inni użytkownicy oraz zarządzać ogłoszeniami
             </div>
           </div>

           <div class="ui fluid card">
        
            <div class="ui top attached label">
              <div class="header"><i class="ui announcement icon"></i>Moje ogłoszenia</div>
            </div>
        
            <div class="ui extra content">
               <button class="ui right floated icon teal button" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie">
                  <i class="add sign icon"></i> 
                  Dodaj
              </button>
            </div>

            <user-anounces :user-id="currentUserId" :items-per-page="5"></user-anounces>
 
           </div>

           <user-public-profile :user=user></user-public-profile>

     </div>

     <!-- MY-ORDERS -->
     <div v-show="view == 'orders'">
       <my-orders :orders="customerOrders"></my-orders>
     </div>

     <!-- MY-SOLD -->
    <div v-show="view == 'sold'">
      <my-sold></my-sold>
    </div>


     <!-- ACCOUNT -->
     <div v-show="view == 'account'">
       <div class="ui fluid card">

          <div class="ui top attached label">
              <i class="ui edit icon"></i>
              Moje dane
          </div>
         
         <div class="content">
           <edit-account 
             :first-name="user.firstName"
             :last-name="user.lastName"
             :location="user.location"
             :email="user.email"></edit-account>
        </div>
      </div>
     </div>

     <!-- CHANGE PASSWORD -->
     <div v-show="view == 'changePassword'">
       <div class="ui fluid card">
         
          <div class="ui top attached label">
              <i class="ui edit icon"></i>
                Zmiana hasła
          </div>
         
         <div class="content">
           <change-password></change-password>
         </div>
       </div>
     </div>

    </div>


</template>

<script>
  import LoadingBox from './components/LoadingBox.vue'
  import AnounceCard from './components/AnounceCard.vue'
  import MyOrders from './components/MyOrders.vue'
  import MySold from './components/MySold.vue'
  import EditAccount from './components/EditAccount.vue'
  import UserPublicProfile from './components/UserPublicProfile.vue'
  import ChangePassword from './components/ChangePassword.vue'
  import UserAnounces from './components/UserAnounces.vue'
  import session from './session'
  import api from './api'
  import $ from 'jquery'

  export default {
    data () {
      return {
        view: 'publicData',
        user: {
          username: 'lala',
          rating: 0,
          commentsCount: 0,
          likesCount: 0,
          lastActive: '',
          location: {title: ''}
        },
        customerOrders: [],
        loading: false,
        currentUserId: session.getUserId()
      }
    },
    components: {
      AnounceCard,
      MyOrders,
      MySold,
      UserPublicProfile,
      EditAccount,
      LoadingBox,
      ChangePassword,
      UserAnounces
    },
    methods: {
      select: function (viewName) {
        this.view = viewName
      },
      logout: function () {
        session.logout()
        this.$router.go({path: '/'})
      }
    },
    ready: function () {
      if (!session.logged()) {
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
        return
      }
      this.loading = true
      api.userDetails(session.getUserId(), session.getJwt(), (response) => {
        this.user = response
        this.user.username = response.firstName
        this.user.rating = 4
        this.user.commentsCount = 2
        this.user.likesCount = 1
        this.user.lastActive = '12h'
        this.loading = false
        $('.ui.star.rating').rating()
      })
      api.getCustomerOrders(session.getUserId(), session.getJwt(), (items) => {
        this.customerOrders = items
      })
    },
    events: {
      'emitOrderEvent': function (order) {
        console.log('order -> ', order)
        $('.ui.modal').modal('hide')
      },
      'emitCloseEvent': function () {
        console.log('close - MyAccount')
        $('.ui.modal').modal('hide')
      }
    }
  }
</script>