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
        <ul class="requestOrders">
          <li v-for="requestOrder in requestOrders" v-link="{ path: '/order', query: { id: requestOrder.id }}">
            <request-order :request-order="requestOrder"></request-order>
          </li>
        </ul>
   </div>
          
 </div>
            
</template>
<script>
import api from '../../api.js'
import util from '../../util'
import session from '../../session.js'
import LoadingBox from '../LoadingBox.vue'
import RequestOrder from './RequestOrder.vue'

const decorate = (requestOrders) => {
  const mapStatus = requestOrder => {
    if (requestOrder.waiting) {
      return 'Oczekujący'
    } else if (requestOrder.rejected) {
      return 'Odrzucony'
    } else if (requestOrder.accepted) {
      return 'Zaakceptowany'
    } else {
      return 'BRAK'
    }
  }

  return requestOrders.map(requestOrder => {
    const isRequestOrderAuthor = requestOrder.authorId === session.getUserId()
    const isAnounceAuthor = requestOrder.anounceAuthorId === session.getUserId()
    requestOrder.waiting = requestOrder.status === 'WAITING'
    requestOrder.rejected = requestOrder.status === 'REJECTED'
    requestOrder.accepted = requestOrder.status === 'ACCEPTED'
    requestOrder.creationDatePretty = util.prettyDateDetailed(new Date(requestOrder.creationDate))
    requestOrder.authorNamePretty = isRequestOrderAuthor ? `Ty (${requestOrder.authorName})` : requestOrder.authorName
    requestOrder.statusPretty = mapStatus(requestOrder)
    requestOrder.deleteAllowed = isRequestOrderAuthor && requestOrder.waiting
    requestOrder.rejectAllowed = isAnounceAuthor && (requestOrder.waiting || requestOrder.accepted)
    requestOrder.acceptAllowed = isAnounceAuthor && (requestOrder.waiting || requestOrder.rejected)
    return requestOrder
  })
}

export default {
  components: {LoadingBox, RequestOrder},
  data () {
    return {
      loading: false,
      requestOrders: []
    }
  },
  methods: {
    reloadRequestOrders: function () {
      api.getRequestOrdersForUser(session.getJwt(), (response) => {
        this.requestOrders = decorate(response)
        this.loading = false
      })
    }
  },
  ready: function () {
    this.loading = true
    this.reloadRequestOrders()
  },
  events: {
    'delete': function (event) {
      this.loading = true
      api.removeRequestOrder(event.id, session.getJwt(), (response) => {
        this.reloadRequestOrders()
      })
    },
    'reject': function (event) {
      this.loading = true
      api.rejectRequestOrder(event.id, session.getJwt(), (response) => {
        this.reloadRequestOrders()
      })
    },
    'accept': function (event) {
      this.loading = true
      api.acceptRequestOrder(event.id, session.getJwt(), (response) => {
        this.reloadRequestOrders()
      })
    }
  }
}
</script>