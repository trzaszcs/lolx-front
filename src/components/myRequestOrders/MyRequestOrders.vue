<template>

  <loading-box :show="loading"></loading-box>

  <div class="ui message">
    <div class="header">
      Lista zamówień
    </div>
    <div class="content">
      <p>
        Tu możesz sprawdzić zamówienia dotyczące Twoich ofert jak i tych założonych przez Ciebie. 
      </p>
    </div>
  </div>
     
  <div class="ui fluid card">
         
    <div class="ui top attached label">
      <i class="ui money icon"></i>Zamówienia
    </div>

    <div class="content">
 
     <filter></filter>

      <ul class="requestOrders" v-if="requestOrders">
        <li v-for="requestOrder in requestOrders">
          <request-order :request-order="requestOrder"></request-order>
        </li>
      </ul>

      <p v-if="requestOrders && requestOrders.length === 0">
        Brak zamówień
      <p>

   </div>
          
 </div>
            
</template>
<script>
import {decorateRequestOrder} from '../../utils/requestOrderDecorator'
import api from '../../api.js'
import session from '../../session.js'
import LoadingBox from '../LoadingBox.vue'
import RequestOrder from './RequestOrder.vue'
import Filter from './Filter.vue'

const decorate = (requestOrders) => {
  return requestOrders.map(requestOrder => {
    return decorateRequestOrder(requestOrder, session.getUserId())
  })
}

export default {
  components: {LoadingBox, RequestOrder, Filter},
  data () {
    return {
      loading: false,
      requestOrders: null,
      filter: {}
    }
  },
  methods: {
    reloadRequestOrders: function () {
      this.loading = true
      api.getRequestOrdersForUser(this.filter.status, session.getJwt(), (response) => {
        this.requestOrders = decorate(response.requestOrders)
        this.loading = false
      })
    }
  },
  ready: function () {
    this.reloadRequestOrders()
  },
  events: {
    'filterChanged': function (event) {
      this.filter = event
      this.reloadRequestOrders()
    }
  }
}
</script>