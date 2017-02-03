<template>
  <div class="ui container myAccount">
    
    <loading-box :show="loading"></loading-box>

    <div class="ui secondary stackable pointing menu">
      <a class="item" v-bind:class="{'active': view == 'publicData'}" @click="select('publicData')">
        Dane publiczne
      </a>
      <a class="item" v-bind:class="{'active': view == 'requestOrders'}" @click="select('requestOrders')">
        Zamówienia
      </a>
      <a class="item" v-bind:class="{'active': view == 'chats'}" @click="select('chats')">
        Rozmowy
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

           <user-public-profile></user-public-profile>

     </div>

    <!-- CHATS -->
    <div v-if="view == 'chats'">
      <my-chats></my-chats>
    </div>

    <!-- REQUEST ORDERS -->
    <div v-if="view == 'requestOrders'">
      <my-request-orders></my-request-orders>
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
            :email="user.email"
            :phone="user.phone"></edit-account>
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
  import EditAccount from './components/EditAccount.vue'
  import UserPublicProfile from './components/UserPublicProfile.vue'
  import ChangePassword from './components/ChangePassword.vue'
  import UserAnounces from './components/UserAnounces.vue'
  import MyChats from './components/myChats/MyChats.vue'
  import MyRequestOrders from './components/myRequestOrders/MyRequestOrders.vue'
  import session from './session'
  import api from './api'
  import $ from 'jquery'

  export default {
    data () {
      return {
        view: 'publicData',
        user: {
          id: session.getUserId(),
          username: 'lala',
          location: {title: ''}
        },
        customerOrders: [],
        ownerOrders: [],
        loading: false,
        currentUserId: session.getUserId()
      }
    },
    components: {
      AnounceCard,
      UserPublicProfile,
      EditAccount,
      LoadingBox,
      ChangePassword,
      UserAnounces,
      MyChats,
      MyRequestOrders
    },
    methods: {
      select: function (viewName) {
        this.view = viewName
        this.$router.go({query: {section: viewName}})
      },
      logout: function () {
        session.logout()
        this.$dispatch('logout', {logout: true})
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

      const section = this.$route.query.section
      if (section) {
        this.view = section
      }
      this.userId = session.getUserId()
      api.getCustomerOrders(session.getUserId(), session.getJwt(), (items) => {
        this.customerOrders = items
        this.loading = false
      })
      api.getOwnerOrders(session.getUserId(), session.getJwt(), (items) => {
        this.ownerOrders = items
        this.loading = false
      })
      this.$broadcast('loadUserRatingEvent', session.getUserId())
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
    },
    watch: {
      '$route': function (newValue, oldValue) {
        const section = this.$route.query.section
        if (section) {
          this.view = section
        }
      }
    }
  }
</script>