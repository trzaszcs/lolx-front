import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Main from './Main'
import Listing from './Listing'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Main
  },
  '/search': {
    component: Listing
  }
})

router.start(App, '#app')
