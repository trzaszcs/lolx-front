<template>
  <div class="globalctr template">
    <!-- Following Menu -->
    <div class="ui large top fixed menu transition hidden">
      <div class="ui container">
        <a class="active item"  v-link="{ path: '/search' }">Dorobie.pl</a>
        <div class="right menu">
          <div class="item">
            <a v-link="{ path: '/login' }"  class="ui button">Log in</a>
          </div>
          <div class="item">
            <a v-link="{ path: '/myAccount' }" class="ui primary button">Moje Konto</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Contents -->
    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui container">
          <div class="ui secondary inverted pointing menu">
            <a class="ui tiny image" v-link="{ path: '/' }"><img src="./assets/logo-big.png"></a>
            <div class="right item">
              <button class="ui icon black button" v-link="{ path: '/search' }" data-tooltip="Nowe wyszukanie" data-position="bottom center">
                  <img  src="./assets/search.png"class="ui mini image"></img> 
              </button>
              <button class="ui icon black button" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie" data-position="bottom center">
                  <img  src="./assets/add.png"class="ui mini image"></img> 
              </button>
              <button class="ui icon black button" v-link="{ path: '/myAccount' }" data-tooltip="Moje Konto" data-position="bottom center">
                  <img  src="./assets/profile.png"class="ui mini image"></img> 
              </button>
            </div>
          </div>
          
        </div>

      </div>

        <p></p>

        <router-view></router-view>

    </div>
    
  </div>
  
  <page-footer></page-footer>
  
</template>

<script>
import PageFooter from './components/PageFooter.vue'

export default {
  components: {
    PageFooter
  },
  data () {
    return {
      siteUrl: ''
    }
  },
  methods: {
  },
  ready: function () {
    this.siteUrl = window.location.href
  }
}
</script>

<style lang="less">
@import '../static/style.less';
@import '../static/main.css';
</style>
