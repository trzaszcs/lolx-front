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

      <div class="anounceChat" v-for="anounceChat in anounceChats">
        <ul>
          <li v-for="chat in anounceChat.chats" v-link="{ path: '/chat', query: { chatId: chat.id }}">
            <span class="author">{{chat.authorNamePretty}}</span> napisał <span class="creationDate">{{chat.creationDatePretty}}</span>
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

const decorate = (anounceChats) => {
  const enrichChat = chat => {
    chat.creationDatePretty = util.prettyDateDetailed(new Date(chat.created))
    chat.authorNamePretty = chat.authorId === session.getUserId() ? `Ty (${chat.authorName})` : chat.authorName
    return chat
  }

  return anounceChats.map(anounceChat => {
    return {
      ...anounceChat,
      chats: anounceChat.chats.map(chat => enrichChat(chat))
    }
  })
}

export default {
  components: {LoadingBox},
  data () {
    return {
      loading: false,
      anounceChats: []
    }
  },
  methods: {
  },
  events: {
  },
  ready: function () {
    this.loading = true
    api.getUserChats(session.getJwt(), (response) => {
      this.anounceChats = decorate(response)
      this.loading = false
    })
  }
}
</script>