<template>
  <div class="ui container myAccount">
    
    <loading-box :show="loading"></loading-box>

    <div class="ui secondary stackable pointing menu">
      <a class="item" v-bind:class="{'active': view == 'publicData'}" @click="select('publicData')">
        Dane publiczne
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
    
    <div class="ui message">
       <div class="header">
         Dane Publiczne
       </div>
       <div class="content">
         Tu możesz zobaczyć jak widzą Ciebie inni użytkownicy oraz zarządzać ogłoszeniami
       </div>
     </div>
  

     <!-- PUBLIC ACCOUNT -->
     <div v-show="view == 'publicData'">

       <div class="ui stackable two column grid">

         <div class="column">   
           <div class="ui fluid card">
        
            <div class="ui extra content">
              <b>Moje ogłoszenia</b>
            </div>
                
            <div class="content">
              <div class="ui fluid selection list">
                <div v-for="item in items" class="item">
                    
                  <img class="ui avatar image" src="assets/plumber.png">
                  
                  <div class="content">
                    <a class="header" v-link="{ path: '/anounce', query: { anounceId: item.id }}">
                        {{item.title}} 
                      </a>
                      <div class="description">
                        {{item.city}} ({{item.state}}) <br/>
                        {{item.creationDate}} <br/>
                        {{item.price}} zł 
                     </div>

                  </div>  
                  
                   <div class="right aligned content">
                        <button class="ui red mini button" v-link="{ path: '/deleteAnounce', query: { anounceId: item.id }}">
                          usuń
                        </button>
                  </div>
  
                </div>
              </div>
            </div> 
           </div>
        </div>


        <div class="column">
             <user-public-profile :user=user></user-public-profile>
        </div> 
        
       </div>
       
     </div>

     <!-- ACCOUNT -->
     <div v-show="view == 'account'">
       <div class="ui fluid card">
         <div class="ui extra content">
           <b>Moje dane</b>
         </div>
         <div class="content">
           <edit-account 
             :first-name="user.firstName"
             :last-name="user.lastName"
             :state="user.state"
             :city="user.city"
             :email="user.email"></edit-account>
        </div>
      </div>
     </div>

     <!-- CHANGE PASSWORD -->
     <div v-show="view == 'changePassword'">
       <div class="ui fluid card">
         <div class="ui extra content">
           <b>Zmiana hasła</b>
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
          lastActive: ''
        },
        items: [],
        loading: false
      }
    },
    components: {
      AnounceCard,
      UserPublicProfile,
      EditAccount,
      LoadingBox,
      ChangePassword
    },
    methods: {
      select: function (viewName) {
        this.view = viewName
      },
      logout: function () {
        session.logout()
        this.$router.go({path: '/'})
      },
      showAnounce: function (selectedItem) {
        console.log('MyAccount - showAnounce' + selectedItem)
        this.$broadcast('showAnounce', {'anounce': selectedItem})
        $('.ui.modal').modal('show')
      }
    },
    ready: function () {
      if (!session.logged()) {
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
        return
      }
      api.getForUser('currentUser', 0, 10, (anounces) => {
        this.items = anounces.anounces
      })
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