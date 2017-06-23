<template>
  <div v-if="requestOrder !== undefined" class="ui container requestOrder">
    <loading-box :show="loading"></loading-box>
    <div v-if="requestOrder === null">
      <p v-if="!anounceAuthor">
        Brak zamówienia dla oferty, kliknij aby utworzyć
      </p>
      <div v-if="!anounceAuthor" class="action">
        <button v-on:click="createRequestOrder" class="ui tiny button">Utwórz</button>
      </div>
    </div>
    <div v-if="requestOrder">
      <p>
        <a v-link="{ path: '/order', query: { orderId: requestOrder.id }}">Zamówienie</a> użytkownika <span class="author">{{requestOrder.authorName}}</span> (status: {{requestOrder.statusPretty}})
      </p>
      
      <div class="action">
        <button v-if="requestOrder.deleteAllowed" v-on:click="deleteRequestOrder" class="ui tiny button">Usuń zamówienie</button>
        <button v-if="requestOrder.rejectAllowed" v-on:click="rejectRequestOrder" class="ui tiny button">Odrzuć</button>
        <button v-if="requestOrder.acceptAllowed" v-on:click="acceptRequestOrder" class="ui tiny button">Akceptuj</button>
      </div>

    </div>
  </div>
</template>

<script>
import session from '../session'
import LoadingBox from '../components/LoadingBox.vue'
import InfoBox from '../components/InfoBox.vue'

export default {
  props: ['requestOrder', 'anounceAuthor'],
  components: {
    LoadingBox,
    InfoBox
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    loadRequestOrder: function (id) {
      this.$dispatch('loadRequestOrder', {id: id})
    },
    deleteRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz usunąć zamówienie?')) {
        this.$dispatch('removeRequestOrder', {id: this.requestOrder.id})
      }
    },
    rejectRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz odrzucić zamówienie?')) {
        this.$dispatch('rejectRequestOrder', {id: this.requestOrder.id})
      }
    },
    acceptRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz zaakceptować zamówienie?')) {
        this.$dispatch('acceptRequestOrder', {id: this.requestOrder.id})
      }
    },
    createRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz utworzyć zamówienie?')) {
        this.$dispatch('createRequestOrder', {})
      }
    }
  },
  ready: function () {
    if (!session.logged()) {
      return
    }
  }
}
</script>
