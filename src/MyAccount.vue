<template>
  <div class="ui container myAccount">
    <div class="ui segment">
     
    <div class="ui card">
      <div class="content">
        <div class="right floated meta">{{lastActive}}</div>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg"> Jan Kowalski
      </div>

      <div class="extra content">
        Rating:
        <div class="ui star rating" data-rating="{{rating}}" id="test"></div>
      </div>
    
      <div class="content">
        <span class="right floated">
          <i class="heart outline like icon"></i>
          {{likesCount}} lajków
        </span>
        <i class="comment icon"></i>
        {{commentsCount}} komentarzy
      </div>
        
      <div class="extra content">
        <div class="ui large transparent left icon input">
          <i class="heart outline icon"></i>
          <input type="text" placeholder="Dodaj komentarz...">
        </div>
      </div>
    </div>
    
    <div class="extra content">
            <h4 class="ui dividing header">Moje ogłoszenia</h4>
    </div>
    
    <div class="ui modal">
      <anounce-card></anounce-card>
    </div>
    
    <div class="ui middle aligned selection list">
      <div v-for="item in items" class="item" v-on:click="showAnounce(item)">
        <img class="ui avatar image" src="assets/plumber.png">
        <div class="content">
          <div class="header">{{item.title}}</div>
        </div>
           
      </div>
    </div>
    <div class="extra content">
    </div>

    </div> 
  </div>

</template>

<script>
  import AnounceCard from './components/AnounceCard.vue'
  import api from './api'
  import $ from 'jquery'

  export default {
    data () {
      return {
        username: 'Jan Kowalski',
        rating: 3,
        commentsCount: 3,
        likesCount: 6,
        lastActive: '12h',
        items: []
      }
    },
    components: {
      AnounceCard
    },
    methods: {
      showAnounce: function (selectedItem) {
        console.log(selectedItem)
        this.$broadcast('showAnounce', {'anounce': selectedItem})
        $('.ui.modal').modal('show')
      }
    },
    ready: function () {
      $('.ui.star.rating').rating()
      api.getForUser('currentUser', 0, 10, (anounces) => {
        this.items = anounces.anounces
      })
    },
    events: {
      'emitOrderEvent': function () {
        console.log('order')
      },
      'emitCloseEvent': function () {
        console.log('close')
        $('.ui.modal').modal('hide')
      }
    }
  }
</script>

<style scoped>

</style>
