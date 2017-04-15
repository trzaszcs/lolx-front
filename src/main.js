import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Welcome from './Welcome'
import Listing from './components/listing/Listing'
import AddAnounce from './AddAnounce'
import MyAccount from './MyAccount'
import Anounce from './Anounce'
import Order from './Order'
import Login from './Login'
import Register from './Register'
import RegisterSuccess from './RegisterSuccess'
import ResetPasswordRequest from './ResetPasswordRequest'
import ResetPassword from './ResetPassword'
import UserAnounces from './UserAnounces'
import Chat from './chat/Chat'
import Error from './Error'
import AddWorker from './components/worker/Add'
import $ from 'jquery'
import session from './session'
import {startPolling} from './utils/backendEventsPoller'
import WorkerListing from './components/worker/listing/Listing'
import WorkerDetails from './components/worker/listing/Details'

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
  },
  '/register': {
    component: Register
  },
  '/registerSuccess': {
    component: RegisterSuccess
  },
  '/resetPasswordRequest': {
    component: ResetPasswordRequest
  },
  '/resetPassword': {
    component: ResetPassword
  },
  '/userAnounces': {
    component: UserAnounces
  },
  '/chat': {
    component: Chat
  },
  '/error': {
    component: Error
  },
  '/addWorker': {
    component: AddWorker
  },
  '/searchWorkers': {
    component: WorkerListing
  },
  '/worker': {
    component: WorkerDetails
  }
})

router.start(App, '#app')

$(document).ajaxError((event, response) => {
  switch (response.status) {
    case 500: {
      console.log('http 500')
      router.go({path: '/error'})
      return null
    }
    case 401: {
      session.logout()
      router.go({path: '/login'})
      return null
    }
    case 404: {
      return null
    }
    default: {
      console.log('unhandled error', response)
    }
  }
})

startPolling()
