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
              <a class="ui inverted button" v-link="{ path: '/myAccount' }">Moje Konto</a>
              <a class="ui inverted button" v-link="{ path: '/addAnounce' }">Dodaj ogłoszenie</a>
            </div>
          </div>
        </div>
      </div>
      
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
</script>

<style lang="less">
@import '../static/style.less';
@import '../static/main.css';
</style>
