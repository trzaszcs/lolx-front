<template>
  <div class="ui container userAnounces">
    <div class="ui segment">
      <loading-box :show="loading"></loading-box>

      <a v-on:click="back" class="ui icon" data-tooltip="wróć na poprzednią stronę">
        <i class="ui left arrow icon"></i>
        wstecz
      </a>

      <h3 class="ui header">Ogłoszenia użytkownika {{username}}</h3>

      <user-anounces :user-id="userId" :items-per-page="20"></user-anounces>
      
    </div>
  </div>
</template>

<script>
import api from './api'
import LoadingBox from './components/LoadingBox.vue'
import UserAnounces from './components/UserAnounces.vue'

export default {
  components: {
    LoadingBox,
    UserAnounces
  },
  data () {
    return {
      userId: null,
      username: '',
      loading: false
    }
  },
  methods: {
    back: function () {
      window.history.back(1)
    }
  },
  ready: function () {
    this.loading = true
    this.userId = this.$route.query.id
    api.userDetails(this.userId, null, (user) => {
      this.username = user.firstName
      this.loading = false
    })
  }
}
</script>
