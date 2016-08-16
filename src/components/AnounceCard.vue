<template>
   <div class="ui container">
    
           <div class="ui card">
            
            <div class="content">
              <img class="right floated mini ui image" src="../assets/plumber.png">
              <div class="ui header">
                {{anounce.title}}
              </div>
              <div class="meta">
                Jan Kowalski - {{anounce.city}} - {{anounce.state}}
              </div>
              <div class="description">
                {{anounce.desc}}
              </div>
            </div>
            
            <div class="extra content">
              <div class="ui two buttons">
                <div class="ui basic green button" v-on:click="emitOrderEvent()">Zamów</div>
                <div class="ui basic red button" v-on:click="emitCloseEvent()">Anuluj</div>
              </div>
            </div>
            
            <div class="extra content">
              <div class="ui header">O użytkowniku</div>
              <user-public-profile :user=user></user-public-profile>
          </div>
            
      </div>

   


  </div>
</template>

<script>
import UserPublicProfile from './UserPublicProfile.vue'
export default {
  components: {
    UserPublicProfile
  },
  data () {
    return {
      anounce: {
        title: '',
        city: '',
        state: '',
        img: '',
        desc: ''
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
    emitOrderEvent: function () {
      this.$dispatch('emitOrderEvent', {})
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
  ready: function () {
  },
  events: {
    'showAnounce': function (selectedItem) {
      console.log('show -> ', selectedItem.anounce)
      this.anounce = selectedItem.anounce
      this.user = this.getUser(selectedItem)
    }
  }
}
</script>
