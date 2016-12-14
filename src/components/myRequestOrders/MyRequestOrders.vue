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
            <a v-link="{path: '/anounce/', query: {id: requestOrder.anounceId}}" target="_blank">{{requestOrder.anounceTitle}}</a> <br/>
            <span class="author">{{requestOrder.authorNamePretty}}</span> zamówił <span class="creationDate">{{requestOrder.creationDatePretty}}</span> <br/>
            <span class="status">{{requestOrder.statusPretty}}</span>
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

const decorate = (requestOrders) => {
  const mapStatus = status => {
    if (status === 'WAITING') {
      return 'Oczekujący'
    } else if (status === 'REJECTED') {
      return 'Odrzucony'
    } else if (status === 'ACCEPTED') {
      return 'Zaakceptowany'
    } else {
      return status
    }
  }

  return requestOrders.map(requestOrder => {
    requestOrder.creationDatePretty = util.prettyDateDetailed(new Date(requestOrder.creationDate))
    requestOrder.authorNamePretty = requestOrder.authorId === session.getUserId() ? `Ty (${requestOrder.authorName})` : requestOrder.authorName
    requestOrder.statusPretty = mapStatus(requestOrder.status)
    return requestOrder
  })
}

export default {
  components: {LoadingBox},
  data () {
    return {
      loading: false,
      requestOrders: []
    }
  },
  ready: function () {
    this.loading = true
    api.getRequestOrdersForUser(session.getJwt(), (response) => {
      this.requestOrders = decorate(response)
      this.loading = false
    })
  }
}
</script>