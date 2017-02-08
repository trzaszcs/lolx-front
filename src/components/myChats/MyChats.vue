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

      <div class="searchResult listing">
        <div class="result" v-if="totalCount && totalCount > 0">
          <h4>Rozmów: {{totalCount}}</h4>

          
          <ul class="items">
            <li v-for="chat in chats" v-link="{ path: '/chat', query: { chatId: chat.id }}">
              <a v-if="chat.unreadMessages > 0" class="ui horizontal label">Nieprzeczytane</a>
              Rozmowa z <span class="author">{{chat.opponentName}}</span> z <span class="creationDate">{{chat.creationDatePretty}}</span><br/>
              w ogłoszeniu <a>{{chat.anounceTitle}}</a>
              <p>"{{chat.firstMessage}}.."</p>
            </li>
          </ul>
          

          <div class="pagingBox" v-if="noOfPages > 0">
            <div class="ui pagination menu">
              <a v-for="page in noOfPages" v-on:click="goToPage(page)" class="item" v-bind:class="{selected:(page == currentPage)}">{{page +1}}</a>
             </div>
          </div>

        </div>

        <p v-if="totalCount === 0">
          Brak rozmów
        <p>

   </div>
          
 </div>
            
</template>
<script>
import api from '../../api.js'
import util from '../../util'
import session from '../../session.js'
import LoadingBox from '../LoadingBox.vue'

const decorate = (chats) => {
  const enrichChat = chat => {
    chat.creationDatePretty = util.prettyDateDetailed(chat.created)
    chat.opponentName = chat.authorId === session.getUserId() ? chat.recipientName : chat.authorName
    return chat
  }

  return chats.map(chat => {
    return enrichChat(chat)
  })
}

const itemsPerPage = 20

export default {
  components: {LoadingBox},
  data () {
    return {
      loading: false,
      chats: [],
      noOfPages: 0,
      totalCount: 0,
      currentPage: 0
    }
  },
  methods: {
    loadUserChats: function () {
      this.loading = true
      api.getUserChats(this.currentPage, itemsPerPage, session.getJwt(), (response) => {
        this.chats = decorate(response.chats)
        this.totalCount = response.totalCount
        this.noOfPages = Math.round(this.totalCount / itemsPerPage)
        this.loading = false
      })
    },
    goToPage: function (page) {
      this.currentPage = page
      this.loadUserChats()
    }
  },
  events: {
  },
  ready: function () {
    this.loadUserChats()
  }
}
</script>