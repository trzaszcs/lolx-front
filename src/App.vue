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
          <div class="ui large secondary inverted pointing menu">
            <a class="active item"  v-link="{ path: '/' }">Appka</a>
            <div class="right item">
              <button class="ui icon button" v-link="{ path: '/myAccount' }" data-tooltip="Moje Konto" data-position="bottom center">
                  <i class="user icon"></i> 
              </button>
              <button class="ui icon button" v-link="{ path: '/addAnounce' }" data-tooltip="Dodaj ogłoszenie" data-position="bottom center">
                  <i class="add sign icon"></i> 
              </button>
            </div>
          </div>
        </div>
      </div>
    
      <div class="ui bottom attached segment">
        <div id="fb-root"></div>
        <div class="fb-like" v-bind:data-href="appkaUrl" data-layout="standard" data-action="recommend" data-show-faces="true" data-share="true"></div>
      </div> 
    
      <router-view></router-view>

    </div>
        
  </div>
</template>

<script>
export default {
  data () {
    return {
      appkaUrl: ''
    }
  },
  methods: {
    facebookInit: function (d, s, id) {
      var js = d.getElementsByTagName(s)[0]
      var fjs = js
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7'
      fjs.parentNode.insertBefore(js, fjs)
    }
  },
  ready: function () {
    this.facebookInit(document, 'script', 'facebook-jssdk')
    this.appkaUrl = document.location.href
    console.log(this.appkaUrl)
  }
}
</script>

<style lang="less">
@import '../static/style.less';
@import '../static/main.css';
</style>
