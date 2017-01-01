<template>
  <div v-if="requestOrder !== undefined" class="ui container requestOrder">
    <loading-box :show="loading"></loading-box>
    <div v-if="requestOrder === null">
      Kliknij aby utworzyć zamówieie <a v-on:click="createRequestOrder" >Utwórz zamówienie</a>
    </div>
    <div v-if="requestOrder">
      <p>
        <a v-link="{ path: '/order', query: { orderId: requestOrder.id }}">Zamówienie</a> utworzono {{requestOrder.creationDatePretty}} posiada status {{requestOrder.statusPretty}}
      </p>
      
      <div class="action">
        <button v-if="requestOrder.deleteAllowed" v-on:click="deleteRequestOrder" class="ui teal tiny button">Usuń zamówienie</button>
        <button v-if="requestOrder.rejectAllowed" v-on:click="rejectRequestOrder" class="ui teal tiny button">Odrzuć</button>
        <button v-if="requestOrder.acceptAllowed" v-on:click="acceptRequestOrder" class="ui teal tiny button">Akceptuj</button>
      </div>

    </div>
  </div>
</template>

<script>
import api from '../api'
import {decorateRequestOrder} from '../utils/requestOrderDecorator'
import session from '../session'
import LoadingBox from '../components/LoadingBox.vue'
import InfoBox from '../components/InfoBox.vue'

export default {
  props: ['anounceId'],
  components: {
    LoadingBox,
    InfoBox
  },
  data () {
    return {
      loading: false,
      requestOrder: undefined
    }
  },
  methods: {
    loadRequestOrder: function () {
      this.loading = true
      api.getRequestOrderForAnounce(this.anounceId, session.getJwt(), (response) => {
        this.loading = false
        this.requestOrder = response ? decorateRequestOrder(response, session.getUserId()) : null
      })
    },
    deleteRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz usunąć zamówienie?')) {
        api.removeRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          this.requestOrder = null
        })
      }
    },
    rejectRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz odrzucić zamówienie?')) {
        api.rejectRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          this.loadRequestOrder()
        })
      }
    },
    acceptRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz zaakceptować zamówienie?')) {
        api.acceptRequestOrder(this.requestOrder.id, session.getJwt(), () => {
          this.loadRequestOrder()
        })
      }
    },
    createRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz utworzyć zamówienie?')) {
        api.requestOrder(this.anounceId, session.getJwt(), () => {
          this.loadRequestOrder()
        })
      }
    }
  },
  ready: function () {
    if (!session.logged()) {
      return
    }
    this.loadRequestOrder()
  }
}
</script>
