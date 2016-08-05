import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Welcome from './Welcome'
import Listing from './Listing'
import AddAnounce from './AddAnounce'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Welcome
  },
  '/search': {
    component: Listing
  },
  '/addAnounce': {
    component: AddAnounce
  }
})

router.start(App, '#app')
