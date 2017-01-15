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
 
     <filter v-if="filterVisible"></filter>

     <div class="searchResult listing">
       <div class="result" v-if="totalCount && totalCount > 0">
         <h4>Zamówień: {{totalCount}}</h4>
         <ul class="items" v-if="requestOrders">
           <li v-for="requestOrder in requestOrders">
              <request-order :request-order="requestOrder"></request-order>
           </li>
         </ul>

         <div class="pagingBox" v-if="noOfPages > 0">
           <div class="ui pagination menu">
             <a v-for="page in noOfPages" v-on:click="goToPage(page)" class="item" v-bind:class="{selected:(page == currentPage)}">{{page +1}}</a>
           </div>
         </div>

       </div>

       <p v-if="totalCount === 0">
         Brak zamówień
       <p>
     </div>

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

const itemsPerPage = 20

export default {
  components: {LoadingBox, RequestOrder, Filter},
  data () {
    return {
      currentPage: 0,
      noOfPages: 0,
      totalCount: null,
      loading: false,
      requestOrders: null,
      filter: {},
      filterVisible: true
    }
  },
  methods: {
    reloadRequestOrders: function () {
      this.loading = true
      const filteringStatus = this.filter.status
      api.getRequestOrdersForUser(
        this.currentPage,
        itemsPerPage,
        this.filter.status,
        session.getJwt(),
        (response) => {
          this.requestOrders = decorate(response.requestOrders)
          this.totalCount = response.totalCount
          this.filterVisible = !((!filteringStatus || filteringStatus === 'ALL') && this.totalCount === 0)
          this.loading = false
          this.noOfPages = Math.round(this.totalCount / itemsPerPage)
        })
    },
    goToPage: function (page) {
      this.currentPage = page
      this.reloadRequestOrders()
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