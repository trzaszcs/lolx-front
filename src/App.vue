<template>
  <div class="globalctr template">
    
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

              <toolbar-events v-if="logged"></toolbar-events>

            </div>
          </div>
        </div>
     </div>
     
     <div class="core">
       <router-view></router-view>
     </div>
    </div>
    
  </div>
  
  <page-footer></page-footer>
  
</template>

<script>
import PageFooter from './components/PageFooter.vue'
import ToolbarEvents from './components/ToolbarEvents.vue'
import session from './session'

export default {
  components: {
    PageFooter,
    ToolbarEvents
  },
  data () {
    return {
      siteUrl: '',
      logged: false
    }
  },
  methods: {
  },
  ready: function () {
    this.siteUrl = window.location.href
    this.logged = session.logged()
    this.$router.afterEach((transition) => {
      const {from, to} = transition
      this.$broadcast('address-changed', {from: {path: from.path, query: from.query}, to: {path: to.path, query: to.query}})
    })
  },
  events: {
    'logout': function () {
      this.logged = false
    },
    'logged': function () {
      this.logged = true
    }
  }
}
</script>

<style lang="less">
@import '../static/style.less';
@import '../static/main.css';
</style>
