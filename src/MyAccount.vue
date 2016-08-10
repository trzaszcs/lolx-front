<template>
  <div class="ui container myAccount">
    <div class="ui segment">
     
    <div class="ui card">
      <div class="content">
        <div class="right floated meta">14h</div>
        <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg"> Jan Kowalski
      </div>
      <div class="image">
        <img>
      </div>

      <div class="extra content">
        Rating:
        <div class="ui star rating" data-rating="3" id="test"></div>
      </div>
    
      <div class="content">
        <span class="right floated">
          <i class="heart outline like icon"></i>
          17 likes
        </span>
        <i class="comment icon"></i>
        3 comments
      </div>
        
      <div class="extra content">
        <div class="ui large transparent left icon input">
          <i class="heart outline icon"></i>
          <input type="text" placeholder="Add Comment...">
        </div>
      </div>
    </div>
    
    <div class="extra content">
            <h4 class="ui dividing header">Moje ogłoszenia</h4>
    </div>
    
    <div class="ui middle aligned selection list">
      <div v-for="item in items" class="item">
        <img class="ui avatar image" src="assets/plumber.png">
        <div class="content">
          <div class="header">{{item.title}}</div>
        </div>
      </div>
    </div>

    </div> 
  </div>

</template>

<script>
  require('semantic')
  var $ = require('jquery')
  export default {
    data () {
      return {
        items: [
          {
            title: 'Przepcham rurę'
          },
          {
            title: 'Wymienię zlew'
          }
        ]
      }
    },
    ready: function () {
      $('.ui.star.rating').rating()
    }
  }
</script>

<style scoped>

</style>
