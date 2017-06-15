<template>
  <div class="globalctr template">
    
    <!-- Page Contents -->
    <div class="pusher">

        <div class="ui secondary  menu" style="padding:1px;margin:1px;">
            <div class="item" style="padding:0px;margin:0px;">

              <a class="ui tiny image" v-link="{ path: '/' }"><img src="./assets/logo-big.png"></a>
              </div>
                <div class="right menu" style="padding:0px;margin:0px;">
                <div class="item">
                    <toolbar-menu :logged="logged" style="padding:0px;margin:0px;"></toolbar-menu>
                </div>
              </div>

         </div>
         
      <div class="ui divider" style="color:gray;margin:0px;padding:0px;margin-bottom:25px;"></div>
     
     <div class="core">
       <router-view></router-view>
     </div>
    </div>
    
  </div>
  
  <page-footer></page-footer>
  
</template>

<script>
import PageFooter from './components/PageFooter.vue'
import ToolbarMenu from './components/ToolbarMenu.vue'
import session from './session'

export default {
  components: {
    PageFooter,
    ToolbarMenu
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
      this.$broadcast('logout', {})
    },
    'logged': function () {
      this.logged = true
      this.$broadcast('logged', {})
    }
  }
}
</script>

<style lang="less">
@import '../static/style.less';
@import '../static/main.css';
</style>
