import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Listing from './components/Listing'
/* eslint-disable no-unused-vars */
import semantic from 'semantic'
import mycss from '../static/main.css'
import myless from '../static/style.less'

Vue.use(VueRouter)

const router = new VueRouter()
const Empty = Vue.extend({})

router.map({
  '/': {
    component: App
  },
  '/search': {
    component: Listing
  }
})

router.start(Empty, '#app')
