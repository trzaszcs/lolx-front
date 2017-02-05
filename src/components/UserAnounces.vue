<template>
  <loading-box :show="loading"></loading-box>

  <info-box :visible="removed" :header="'Zamknięcie ogłoszenia'" :message="'Ogłoszenie zostało pomyślnie zamknięte'"></info-box>

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
          <div class="meta">
            <div class="price">Cena {{item.price}} zł</div>
          </div>
        </div>  
                           
        <button class="ui right floated small button" v-if="forCurrentUser" v-on:click="close(item)">
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
  import $ from 'jquery'
  import session from '../session'
  import {anouncesDecorator} from '../decorator'
  import LoadingBox from './LoadingBox'
  import InfoBox from './InfoBox'
  import api from '../api'

  export default {
    props: ['userId', 'itemsPerPage'],
    components: {LoadingBox, InfoBox},
    data () {
      return {
        loading: false,
        forCurrentUser: false,
        anounces: [],
        currentPage: 0,
        totalCount: null,
        pageCount: 0,
        removed: false
      }
    },
    methods: {
      show: function (selectedItem) {
        this.$router.go({'path': '/anounce', 'query': { anounceId: selectedItem.id }})
      },
      close: function (selectedItem) {
        if (window.confirm('Czy napewno chcesz zamknąć ogłoszenie?')) {
          api.closeAnounce(selectedItem.id, session.getJwt(), (result) => {
            this.loadPage()
            this.removed = true
          })
        }
      },
      showPage: function (page) {
        this.currentPage = page
        this.loadPage()
      },
      loadPage: function () {
        this.loading = true
        api.getForUser(this.userId, this.currentPage, this.itemsPerPage, (response) => {
          this.anounces = anouncesDecorator(response.anounces)
          this.totalCount = response.totalCount
          this.pageCount = this.totalCount / this.itemsPerPage
          this.loading = false
        })
      }
    },
    ready: function () {
      this.forCurrentUser = session.getUserId() === this.userId
      this.currentPage = 0
      this.loadPage()
      $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade')
      })
    }
  }
</script>