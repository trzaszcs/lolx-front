import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Template from './Template'
import Listing from './Listing'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Template
  },
  '/search': {
    component: Listing
  }
})

router.start(App, '#app')
