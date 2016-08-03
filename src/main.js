import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Listing from './components/Listing'

Vue.use(VueRouter)

const router = new VueRouter()

const Bar = Vue.extend({
  template: '<p>This is bar!</p>'
})

const Empty = Vue.extend({})

router.map({
  '/': {
    component: App
  },
  '/search': {
    component: Listing
  },
  '/bar': {
    component: Bar
  }
})

router.start(Empty, '#app')
