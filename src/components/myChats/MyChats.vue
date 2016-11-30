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
               
      <div class="ui fluid selection list" v-for="chat in chats">
        <div class="ui item" v-link="{ path: '/chat', query: { chatId: chat.id }}">
          <div class="content">
            <a class="header">
              {{chat.anounceTitle}} 
            </a>
          </div> 
          <div class="meta">
            Data utworzenia {{chat.created}} <br/>
            Author {{chat.authorName}} <br/>
          </div> 
        </div>
      </div>
          
    </div>
        
  </div>
     
</template>
<script>
import api from '../../api.js'
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