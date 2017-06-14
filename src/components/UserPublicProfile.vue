<template>
    <div class="anounceCard">

      <div class="ui header" style="color:gray">
        <i class="user icon"></i>O użytkowniku
      </div>
      <div class="ui divider" style="color:gray;"></div>
      
        <div class="ui gray header">
          <img class="ui avatar image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMr0df7Bxkkgk76H60KgAaRcxz3uUF4Jxa_uHtqEpW4Ltl8Ic3zw">
                {{user.firstName}} {{user.lastName}}
                
                
           <div  style="float:right;margin-top:5px;">

            <div v-if="rating.starRate > 0" style="float:left;font-size:1.5em;">
              <i class="ui left floated orange star icon"></i>
                {{rating.starRate.toPrecision(2)}}/5

            </div>
        
            <div v-if="rating.likeCount > 0" data-tooltip="Przyznanych medali" style="float:right;background-color:#95b32d;color:white;padding:0px;margin-left:5px;"> <i class="ui left floated white certificate icon"></i>
                  {{rating.likeCount}}
            </div> 
          </div> 

        
        </div>

        <div aligned="right"  v-if="rating.starRate > 0">
          <div align="right">
            ocena na podstawie {{rating.starRateCount}} głosów <br>
            <a v-on:click="loadComments()">komentarze ({{rating.lastComments.length}}) ...</a>
          </div>
        </div>

      <div class="ui section">

        <div v-if="rating.starRate == 0" align="center">
          <i class="ui left floated orange star icon"></i>ten użytkownik nie został jeszcze oceniony
        </div>
      </div>
      
      <div v-show="showComments" class="content">
        <div class="ui divider" style="color:gray;"></div>
        <user-comments></user-comments>
      </div>
      
    </div>
    
    <div class="anounceCard">

      <div class="ui header">
        <i class="star icon"></i>Twoja ocena
      </div>
      
      <div class="ui divider" style="color:gray;"></div>

      
        <div class="ui stackable two column grid">
          
          <div class="ten wide column">
            <div class="ui huge star rating" data-max-rating="5" id="rating"></div>
            <span class="large text" style="color: gray">{{myVote.starRate.toPrecision(2)}}/5</span>
          </div>
      
          <div class="six wide right floated column">
            <button class="ui right floated toggle circular compact icon button" v-bind:class="{ active: isActive }" v-on:click="saveLike()" data-tooltip="Medal mozesz przyznac do każdego ogłoszenia oraz zrealizowanego zamówienia uzytkownika.">
              <i class=" certificate icon"></i>
                <span v-if="isActive">1</span>
                <span v-if="!isActive">0</span>
            </button>

          </div>
        </div>

        <div class="ui big fluid transparent right icon focus input"  style="background-color:#F5F5F5;height:60px;padding:10px;margin-top:20px;">
          <i class="comment outline icon" style="margin-right:10px;"></i>
          <input type="text" v-model="comment" v-on:change="saveComment()" placeholder="Podziel się opinią ...">
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
      isActive: false,
      showComments: false
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
        console.log('user vote: %s, %s, %s', response.like, response.starRate, response.comment)
        this.myVote = response
        this.comment = this.myVote.comment
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
      this.myVote.comment = comment
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
      this.myVote.comment = comment
      const isLikeActive = this.isActive
      console.log('saving userId %s announceId %s comment %s', userId, announceId, comment)
      api.updateUserLikesRating(userId, announceId, isLikeActive, comment, session.getJwt(), (response) => {
        console.log('user likes added: %s %s', userId, announceId)
        this.loadUserRating(userId)
        this.isActive = !this.isActive
      })
    },
    saveComment: function () {
      if (!session.logged()) {
        session.setBackUrl(this.$route)
        this.$router.go({path: '/login'})
        return
      }
      const userId = this.user.id
      const announceId = this.announceId
      const comment = this.comment
      if (this.myVote !== null && (comment !== this.myVote.comment)) {
        const starRating = this.myVote.starRate
        console.log('saving comment %s', this.comment)
        api.updateUserStarRating(userId, announceId, starRating, comment, session.getJwt(), (response) => {
          console.log('user rating comment update: %s', response.starRate)
        })
      }
    },
    loadComments: function () {
      this.showComments = !this.showComments && this.rating.lastComments.length > 0
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
