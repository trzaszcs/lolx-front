<template>
  <loading-box :show="loading"></loading-box>
  <div class="content listing">
    Znaleziono {{totalCount}} ogłoszenia
    <div class="ui fluid selection list" v-for="item in anounces">
      <div class="ui item">

        <div class="left floated content">
          <img class="ui tiny image" :src="item.img">
        </div>

        <div class="content">
          <a class="header" v-link="{ path: '/anounce', query: { anounceId: item.id }}">
            {{item.title}} 
          </a>
          <div class="description" v-on:click="show(item)">
            Cena {{item.price}} zł 
          </div>
        </div>  
                           
        <button class="ui right floated teal button" v-if="forCurrentUser" v-on:click="close(item)">
          zamknij
        </button>

      </div>
    </div>

    <div v-if="pageCount > 1" class="pagingBox">
      <div class="ui pagination menu">
        <a v-for="page in pageCount" v-on:click="showPage(page)" class="item" v-bind:class="{selected:(page === currentPage)}">{{page +1}}</a>
      </div>
    </div>

  </div> 
  
</template>

<script>
  import session from '../session'
  import {anouncesDecorator} from '../decorator'
  import LoadingBox from './LoadingBox'
  import api from '../api'

  const ITEMS_PER_PAGE = 5

  export default {
    props: ['userId'],
    components: {LoadingBox},
    data () {
      return {
        loading: false,
        forCurrentUser: false,
        anounces: [],
        currentPage: 0,
        totalCount: null,
        pageCount: 0
      }
    },
    methods: {
      show: function (selectedItem) {
        this.$router.go({'path': '/anounce', 'query': { anounceId: selectedItem.id }})
      },
      close: function (selectedItem) {
        if (window.confirm('Czy napewno chcesz zamknąć ogłoszenie?')) {
          api.closeAnounce(selectedItem.id, session.getJwt(), (result) => {
            this.$router.go({path: '/myAccount'})
          })
        }
      },
      showPage: function (page) {
        this.currentPage = page
        this.loadPage()
      },
      loadPage: function () {
        this.loading = true
        api.getForUser(this.userId, this.currentPage, ITEMS_PER_PAGE, (response) => {
          this.anounces = anouncesDecorator(response.anounces)
          this.totalCount = response.totalCount
          this.pageCount = this.totalCount / ITEMS_PER_PAGE
          this.loading = false
        })
      }
    },
    ready: function () {
      this.forCurrentUser = session.getUserId() === this.userId
      this.currentPage = 0
      this.loadPage()
    }
  }
</script>