<template>
  <div class="ui container myAccount">
    <loading-box :show="loading"></loading-box>
    <div class="ui fluid card">
      <div class="extra content">
        <div class="ui header">Mój profil publiczny</div>
        <user-public-profile :user=user></user-public-profile>
      </div>
      
      <div class="extra content">
        <div class="ui header">Moje dane</div>
        <edit-account 
          :first-name="user.firstName"
          :last-name="user.lastName"
          :state="user.state"
          :city="user.city"></edit-account>
      </div>      

      <div class="extra content">
        <div class="ui header">Moje ogłoszenia</div>
      </div>
      
        <div class="ui modal">
            <div class="content">
              <anounce-card></anounce-card>
            </div>
        </div>
      
      <div class="extra content">
        <div class="ui middle aligned selection list">
          <div v-for="item in items" class="item" v-on:click="showAnounce(item)">
            <img class="ui avatar image" src="assets/plumber.png">
            <div class="content">
              <div class="header">{{item.title}}</div>
            </div>
          </div>
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
  import session from './session'
  import api from './api'
  import $ from 'jquery'

  export default {
    data () {
      return {
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
      LoadingBox
    },
    methods: {
      showAnounce: function (selectedItem) {
        console.log('MyAccount - showAnounce' + selectedItem)
        this.$broadcast('showAnounce', {'anounce': selectedItem})
        $('.ui.modal').modal('show')
      },
      getUser: function () {
        return {
          username: 'X Y',
          rating: 4,
          commentsCount: 2,
          likesCount: 1,
          lastActive: '12h'
        }
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