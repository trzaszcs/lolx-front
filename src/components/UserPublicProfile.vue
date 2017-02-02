<template>
    <div class="ui fluid card">

      <div class="ui top attached label">
        <i class="user icon"></i>O użytkowniku
      </div>
      
      <div class="content">
        <div class="right floated meta">{{rating.lastActive}}</div>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">{{user.username}}
      </div>

      <div class="extra content">
        Rating:
        <div class="ui star rating" data-max-rating="5" id="rating"></div>
        <span><b>{{rating.starRate}}</b> </span> 
        <span class="ui right floated">{{rating.starRateCount}} głosów</span>
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
        $('.ui.star.rating').rating({
          initialRating: this.rating.starRate
        })
      })
    }
  },
  ready: function () {
  },
  events: {
    'loadUserRatingEvent': function (userId) {
      console.log('loadUserRatingEvent')
      this.loadUserRating(userId)
    }
  }
}
</script>
