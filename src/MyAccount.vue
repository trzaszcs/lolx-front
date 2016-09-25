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
        
            <div class="ui extra content">
              <div class="header">Moje ogłoszenia</div>
               <button class="ui right floated icon button" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie">
                  <i class="add sign icon"></i> 
                  Dodaj ogłoszenie
              </button>
            </div>
                
            <div class="content">
              <div class="ui fluid selection list" v-for="item in items">
                <div class="ui item">
                  <div class="left floated content">
                    <img class="ui tiny image" src="http://semantic-ui.com/images/wireframe/image.png">
                  </div>
                  <div class="content">
                    <a class="header" v-link="{ path: '/anounce', query: { anounceId: item.id }}">
                        {{item.title}} 
                      </a>
                      <div class="description" v-on:click="showAnounce(item)">
                        Cena {{item.price}} zł 
                     </div>

                  </div>  
                           
                  <button class="ui right floated button" v-on:click="deleteAnounce(item)">
                    usuń
                  </button>
            
                </div>

              </div>
            </div> 
           </div>

           <user-public-profile :user=user></user-public-profile>

     </div>

     <!-- MY-ORDERS -->
     <div v-show="view == 'orders'">
       
      <div class="ui message">
       <div class="header">
        Historia zamówień usług
       </div>
       <div class="content">
         Tu możesz zobaczyć jakie usługi zamówiłeś oraz kto jest ich wykonawcą.
       </div>
     </div>
       
       <div class="ui fluid card">
         <div class="ui extra content">
          <div class="header">
            Moje zamówienia usług
          </div>
         </div>
         <div class="content">
          
             <div class="ui fluid selection list" v-for="order in customerOrders">
                <div class="ui item" v-link="{ path: '/order', query: { orderId: order.requestId }}">
                  <div class="left floated content">
                    <img class="ui tiny image" src="http://semantic-ui.com/images/wireframe/image.png">
                  </div>
                  <div class="content">
                      <a class="header">
                          {{order.title}} {{order.requestId}} 
                      </a>
                  </div> 
                  <div class="meta">
                          Preferowana data {{order.preferedDate}} {{order.preferedTime}} 
                  </div> 
                </div>
             </div>
        </div>
        
      </div>
     </div>


    <div v-show="view == 'sold'">
           
          <div class="ui message">
           <div class="header">
            Lista Twoich sprzedanych usług
           </div>
          <div class="content">
            <p>
               Tu możesz sprawdzić na które ogłoszenia spłynęły zamówienia oraz dane zamawiających Twoje usługi. 
               </p>
               <p>
                 <b>Uwaga:</b> Aby zamówić usługę nie trzeba posiadać konta dorobie.pl - wtedy mamy tylko takie dane jak telefon czy email zamawiającego.
               </p>
             </div>
         </div>
     
     </div>


     <!-- ACCOUNT -->
     <div v-show="view == 'account'">
       <div class="ui fluid card">
         <div class="ui extra content">
            <div class="header">
              Moje dane
            </div>
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
         <div class="ui extra content">
            <div class="header">
              Zmiana hasła
            </div>
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
          lastActive: '',
          location: {title: ''}
        },
        items: [],
        customerOrders: [],
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
        this.$router.go({'path': '/anounce', 'query': { anounceId: selectedItem.id }})
      },
      deleteAnounce: function (selectedItem) {
        api.deleteAnounce(selectedItem.id, session.getJwt(), (result) => {
          this.$router.go({path: '/myAccount'})
        })
      }
    },
    ready: function () {
      if (!session.logged()) {
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
        return
      }
      api.getForUser(session.getUserId(), 0, 10, (anounces) => {
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