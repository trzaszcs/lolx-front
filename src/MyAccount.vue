<template>
  <div class="ui container myAccount" style="padding-left:5px;padding-right:5px;padding-bottom:5px;background-color:#F5F5F5;">
    
    <loading-box :show="loading"></loading-box>

    <div class="ui grey secondary stackable pointing menu">
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

          <div style="background-color:#95b32d;color:white;padding:20px;">
             <div class="ui header" style="color:white;">
               Tu możesz zobaczyć jak widzą Ciebie inni użytkownicy oraz zarządzać ogłoszeniami
             </div>
           </div>

           <div class="accountCard">
        
            <div class="ui header" style="color:gray">
              <i class="ui announcement icon"></i>Moje ogłoszenia
            </div>
        

               <button class="ui right floated icon button" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie">
                  <i class="add sign icon"></i> 
                  Dodaj
              </button>

             <div class="ui divider" style="color:gray;margin-top:60px;"></div>

            
            <div class="ui section">

            <user-anounces :user-id="currentUserId" :items-per-page="5"></user-anounces>
 
             </div>
 
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
    <div v-if="view == 'account'">
      <edit-account></edit-account>
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
  import $ from 'jquery'
  import scheduler from './utils/scheduler'

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
        scheduler.stop()
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
      const section = this.$route.query.section
      if (section) {
        this.view = section
      }
      this.userId = session.getUserId()
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