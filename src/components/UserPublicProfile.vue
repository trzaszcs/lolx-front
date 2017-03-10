<template>
    <div class="ui fluid card">

      <div class="ui top attached label">
        <i class="user icon"></i>O użytkowniku
      </div>
      
      <div class="content">
        <span class="right floated">
            <i class="thumbs up icon"></i>
            Polecony {{rating.likeCount}} razy
        </span>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">
        {{user.firstName}} {{user.lastName}}
      </div>

      <div class="content">
        <i class="ui left floated big orange star icon"></i>
        <div v-if="rating.starRate > 0">
          <span  class="ui left floated">
            <h2>{{rating.starRate.toPrecision(2)}}/5</h2> 
          </span> 
          <span class="ui right floated">
            ocena na podstawie {{rating.starRateCount}} głosów <br>
            <a v-on:click="loadComments()">komentarze ({{rating.lastComments.length}}) ...</a>
          </span>
        </div>
        <span v-if="rating.starRate == 0" class="ui left floated">
          ten użytkownik nie został jeszcze oceniony
        </span>
      </div>
      <div class="content">
        <user-comments></user-comments>
      </div>
    </div>
    
    <div class="ui fluid card">

      <div class="ui top attached label">
        <i class="star icon"></i>Twoja ocena
      </div>
      
      <div class="content">
        <div class="ui stackable two column grid">
  <div class="ten wide column">
        <div class="ui large star rating" data-max-rating="5" id="rating"></div>
        <span class="large text">{{myVote.starRate.toPrecision(2)}}/5</span>
        <p></p>
        <div class="ui fluid transparent left icon focus input">
          <i class="comment outline icon"></i>
          <input type="text" v-model="comment" v-on:change="saveComment()" placeholder="Podziel się opinią ...">
        </div>
      </div>
    
  <div class="six wide right floated column">
    <button class="ui fluid toggle button" v-bind:class="{ active: isActive }" v-on:click="saveLike()">
      Polecam
    </button>
  </div>
</div>
        
    </div>
    
</template>

<script>
import session from '../session'
import api from '../api'
import $ from 'jquery'
import UserComments from './UserComments.vue'

export default {
  components: {
    UserComments
  },
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
      },
      announceId: '',
      myVote: {
        like: 0,
        starRate: 0.0,
        comment: ''
      },
      isActive: false
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
    loadMyVote: function (announceId) {
      console.log('loading vote voterId: %s, announceId: %s', session.getUserId(), announceId)
      if (!session.logged() || announceId == null) {
        return
      }
      api.getVote(announceId, session.getJwt(), (response) => {
        console.log('user vote: %s, %s', response.like, response.starRate)
        this.myVote = response
        $('.ui.star.rating').rating('set rating', this.myVote.starRate)
        if (this.myVote.like > 0) {
          this.isActive = true
        }
      })
    },
    saveRating: function (value) {
      if (!session.logged()) {
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
        return
      }
      const userId = this.user.id
      const announceId = this.announceId
      const starRating = value
      const comment = this.comment
      console.log('saving starRate %s, userId %s announceId %s comment %s', value, userId, announceId, comment)
      api.updateUserStarRating(userId, announceId, starRating, comment, session.getJwt(), (response) => {
        console.log('user rating added: %s', response.starRate)
        this.loadUserRating(userId)
      })
    },
    saveLike: function () {
      if (!session.logged()) {
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
        return
      }
      const userId = this.user.id
      const announceId = this.announceId
      const comment = this.comment
      const isLikeActive = this.isActive
      console.log('saving userId %s announceId %s comment %s', userId, announceId, comment)
      api.updateUserLikesRating(userId, announceId, isLikeActive, comment, session.getJwt(), (response) => {
        console.log('user likes added: %s %s', userId, announceId)
        this.loadUserRating(userId)
      })
    },
    saveComment: function () {
      console.log('saving comment %s', this.comment)
    },
    loadComments: function () {
      this.$broadcast('loadComments', this.rating.lastComments)
    }
  },
  ready: function () {
    $('.ui.star.rating').rating('setting', 'onRate', this.saveRating)
    $('.ui.toggle.button').state()
  },
  events: {
    'loadUserRatingEvent': function (userId, announceId) {
      this.announceId = announceId
      this.user.id = userId
      this.loadUserRating(userId)
      api.userDetails(userId, session.getJwt(), (response) => {
        this.user = response
      })
      this.loadMyVote(announceId)
    }
  }
}
</script>
