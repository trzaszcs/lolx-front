<template>
    <div class="ui fluid card">

      <div class="ui top attached label">
        <i class="user icon"></i>O użytkowniku
      </div>
      
      <div class="content">
        <div class="right floated meta">{{rating.lastActive}}</div>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">{{user.username}}
      </div>

      <div class="content">
        <i class="ui left floated big orange star icon"></i><span class="ui left floated"><h2>{{rating.starRate}}</h2> </span> 
        <span class="ui right floated">{{rating.starRateCount}} głosów</span>
      </div>
    
      <div class="extra content">
        Skorzystałem / moja ocena:
        <div class="ui star rating" data-max-rating="5" id="rating"></div>
      </div>
    
      <div class="content">
        <span class="right floated">
          <i class="heart outline like icon"></i>
          {{rating.likeCount}} lajków
        </span>
        <i class="comment icon"></i>
        {{rating.commentsCount}} komentarzy
      </div>
        
      <div class="extra content">
        <div class="ui large transparent left icon focus input">
          <i class="heart outline icon"></i>
          <input type="text" placeholder="Dodaj komentarz...">
        </div>
      </div>
    </div>
    
</template>

<script>
import session from '../session'
import api from '../api'
import $ from 'jquery'
export default {
  props: ['user'],
  data () {
    return {
      rating: {
        starRate: 0,
        likeCount: 0,
        starRateCount: 0,
        commentsCount: 0,
        lastActive: '1h temu'
      }
    }
  },
  methods: {
    loadUserRating: function (userId) {
      console.log('user: %s', userId)
      api.getUserRating(userId, session.getJwt(), (response) => {
        console.log('user rating: %s', response.likeCount)
        this.rating = response
      })
    },
    saveRating: function (value) {
      console.log(value)
    }
  },
  ready: function () {
    $('.ui.star.rating').rating('setting', 'onRate', this.saveRating)
  },
  events: {
    'loadUserRatingEvent': function (userId) {
      console.log('loadUserRatingEvent')
      this.loadUserRating(userId)
    }
  }
}
</script>
