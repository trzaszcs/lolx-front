<template>

  <loading-box :show="loading"></loading-box>

  <div class="ui message">
    <div class="header">
      Lista Twoich rozmów
    </div>
    <div class="content">
      <p>
        Tu możesz sprawdzić swoje konwersacje. 
      </p>
    </div>
  </div>
     
  <div class="ui fluid card">
         
    <div class="ui top attached label">
      <i class="ui money icon"></i>Twoje rozmowy
    </div>

    <div class="content">

      <div class="anounceChat" v-for="anounceChat in chats">
        <ul>
          <li v-for="chat in anounceChat.chats" v-link="{ path: '/chat', query: { chatId: chat.id }}">
            <span class="author">{{chat.authorName}}</span> napisał <span class="creationDate">{{formatDate(chat.created)}}</span>
            <p>"{{chat.firstMessage}}.."</p> 
          </li>
        </ul>
        w ogłoszeniu <a v-link="{path: '/anounce/', query: {id: anounceChat.anounceId}}" target="_blank">{{anounceChat.anounceTitle}}</a>
      </div>
        
   </div>
          
 </div>
            
</template>
<script>
import api from '../../api.js'
import util from '../../util'
import session from '../../session.js'
import LoadingBox from '../LoadingBox.vue'

export default {
  components: {LoadingBox},
  data () {
    return {
      loading: false,
      chats: null
    }
  },
  methods: {
    formatDate: function (dateStr) {
      return util.prettyDateDetailed(new Date(dateStr))
    }
  },
  events: {
  },
  ready: function () {
    this.loading = true
    api.getUserChats(session.getJwt(), (response) => {
      this.chats = response
      this.loading = false
    })
  }
}
</script>