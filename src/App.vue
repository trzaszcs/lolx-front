<template>
  <div class="globalctr template">
    
    <!-- Page Contents -->
    <div class="pusher">

        <div class="ui secondary  menu">
            <div class="item">

              <a class="ui tiny image" v-link="{ path: '/' }"><img src="./assets/logo-big.png"></a>
              </div>
                <div class="right menu">
    <div class="item">
              <toolbar-menu :logged="logged"></toolbar-menu>

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
