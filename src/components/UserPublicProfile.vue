<template>
    <div class="ui fluid card">

      <div class="ui top attached label">
        <i class="user icon"></i>O użytkowniku
      </div>
      
      <div class="content">
        <span class="right floated">
          <i class="teal thumbs up icon"></i>
          {{rating.likeCount}} lajków
        </span>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">
        {{user.firstName}} {{user.lastName}}
      </div>

      <div class="content">
        <i class="ui left floated big orange star icon"></i>
        <span class="ui left floated">
          <h2>{{rating.starRate.toPrecision(2)}}/5</h2> 
        </span> 
        <span class="ui right floated">
          ocena na podstawie {{rating.starRateCount}} głosów <br>
          <a>komentarze ({{rating.lastComments.length}}) ...</a>
        </span>
      </div>
    
      <div class="extra content">
        Moja ocena:
        <div class="ui star rating" data-max-rating="5" id="rating"></div>
        <p></p>
        <div class="ui fluid transparent left icon focus input">
          <i class="comment outline icon"></i>
          <input type="text" v-model="comment" v-on:change="saveComment()" placeholder="Dodaj komentarz...">
        </div>
      </div>
    
    </div>
    
</template>

<script>
import session from '../session'
import api from '../api'
import $ from 'jquery'
export default {
  data () {
    return {
      rating: {
        starRate: 0,
        likeCount: 0,
        starRateCount: 0,
        commentsCount: 0,
        lastComments: [],
        lastActive: '1h temu'
      },
      comment: '',
      user: {
        id: session.getUserId(),
        firstName: '',
        lastName: '',
        location: {title: ''}
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
      const userId = this.user.id
      const announceId = ''
      const starRating = value
      const comment = this.comment
      console.log('saving starRate %s, userId %s comment %s', value, userId, comment)
      api.updateUserStarRating(userId, announceId, starRating, comment, session.getJwt(), (response) => {
        console.log('user rating added: %s', response.starRate)
        this.loadUserRating(userId)
      })
    },
    saveComment: function () {
      console.log('saving scomment %s', this.comment)
    }
  },
  ready: function () {
    $('.ui.star.rating').rating('setting', 'onRate', this.saveRating)
  },
  events: {
    'loadUserRatingEvent': function (userId) {
      this.user.id = userId
      this.loadUserRating(userId)
      api.userDetails(userId, session.getJwt(), (response) => {
        this.user = response
      })
    }
  }
}
</script>
