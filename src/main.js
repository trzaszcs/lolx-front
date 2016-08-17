import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Welcome from './Welcome'
import Listing from './Listing'
import AddAnounce from './AddAnounce'
import MyAccount from './MyAccount'
import Anounce from './Anounce'
import Order from './Order'
import Login from './Login'

// eslint-disable-next-line no-unused-vars
import semantic from 'semantic'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Welcome
  },
  '/search': {
    component: Listing
  },
  '/myAccount': {
    component: MyAccount
  },
  '/addAnounce': {
    component: AddAnounce
  },
  '/anounce': {
    component: Anounce
  },
  '/order': {
    component: Order
  },
  '/login': {
    component: Login
  }
})

router.start(App, '#app')
