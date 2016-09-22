<template>
  <div class="template">
    <!-- Following Menu -->
    <div class="ui large top fixed menu transition hidden">
      <div class="ui container">
        <a class="active item"  v-link="{ path: '/myAccount' }">Appka</a>
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
            <a v-link="{ path: '/' }"><img src="./assets/dorobie-1.png"></a>
            <div class="right item">
              <button class="ui icon black button" v-link="{ path: '/search' }" data-tooltip="Nowe wyszukanie" data-position="bottom center">
                  <i class="search icon"></i> 
              </button>
              <button class="ui icon black button" v-link="{ path: '/myAccount' }" data-tooltip="Moje Konto" data-position="bottom center">
                  <i class="user icon"></i> 
              </button>
              <button class="ui icon black button" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie" data-position="bottom center">
                  <i class="add sign icon"></i> 
              </button>
            </div>
          </div>
          
        </div>

      </div>

      <div class="ui bottom attached segment">
        <div class="fb-like" v-bind:data-href="siteUrl" data-layout="button_count" data-action="recommend" data-show-faces="true" data-share="true"></div>
      </div> 

      <router-view></router-view>
      

    <div class="ui inverted vertical footer segment" id="footerspace">
    
    <div class="ui center aligned container">
          <div class="ui stackable inverted divided grid">
            <div class="three wide column">
              <h4 class="ui inverted header">Wyszukaj</h4>
              <div class="ui inverted link list">
                <a v-link="{ path: '/search' }" class="item">Strona wyszukiwania</a>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header">Ogłoszenia</h4>
              <div class="ui inverted link list">
                <a v-link="{ path: '/addAnounce' }" class="item">Dodaj ogłoszenie</a>
                <a v-link="{ path: '/myAccount' }" class="item">Moje ogłoszenia</a>
                <a v-link="{ path: '/myAccount' }" class="item">Moje zamówienia</a>
                <a v-link="{ path: '/search' }" class="item">Szukaj ogłoszenia</a>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header">Moje konto</h4>
              <div class="ui inverted link list">
                <a v-link="{ path: '/register' }" class="item">Załuż konto</a>
                <a v-link="{ path: '/myAccount' }" class="item">Dane publiczne</a>
                <a v-link="{ path: '/myAccount' }" class="item">Edytuj konto</a>
                <a v-link="{ path: '/resetPasswordRequest' }" class="item">Reset hasła</a>
              </div>
            </div>
            <div class="seven wide column">
              <h4 class="ui inverted header">Dorobie.pl</h4>
              <p>Pozwalamy na znalezienie odpowiedniego dla Ciebie ogłoszenia mikro usługi - czyli rzeczy na którą nie masz czasu (np. sprzątanie, codzienne zakupy)
              i w której wyręczyć Ciebie mogą Ogłoszeniodawcy. Ty także możesz dodawać swoje ogłoszenia!</p>
            </div>
          </div>
          <div class="ui inverted section divider"></div>
          <img src="assets/logo.png" class="ui centered mini image">
          <div class="ui horizontal inverted small divided link list">
            <a class="item" v-link="{ path: '/sitemap' }">Mapa strony</a>
            <a class="item" v-link="{ path: '/contact' }">Kontakt</a>
            <a class="item" v-link="{ path: '/terms' }">Regulamin</a>
            <a class="item" v-link="{ path: '/privacy' }">Polityka prywatności</a>
          </div>
        </div>
    
      </div>


    </div>
        
  </div>
  

  
  
</template>

<script>
import sp from './socialplugin'

export default {
  components: {
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
    sp.facebookInit(document, 'script', 'facebook-jssdk')
  }
}
</script>

<style lang="less">
@import '../static/style.less';
@import '../static/main.css';
</style>
