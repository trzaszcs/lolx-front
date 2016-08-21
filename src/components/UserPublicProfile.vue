<template>
    <div class="ui fluid card">
      <div class="content">
        <div class="right floated meta">{{user.lastActive}}</div>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">{{user.username}}
      </div>

      <div class="extra content">
        Rating:
        <div class="ui star rating" data-rating="{{user.rating}}" id="test"></div>
      </div>
    
      <div class="content">
        <span class="right floated">
          <i class="heart outline like icon"></i>
          {{user.likesCount}} lajków
        </span>
        <i class="comment icon"></i>
        {{user.commentsCount}} komentarzy
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
import $ from 'jquery'
export default {
  props: ['user'],
  data () {
    return {
    }
  },
  methods: {
  },
  ready: function () {
    $('.ui.star.rating').rating()
  },
  events: {
  }
}
</script>
