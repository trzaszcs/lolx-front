<template>
  <loading-box :show="loading"></loading-box>
  <div class="ui middle aligned center aligned grid login">
    <div class="column">
      <div v-if="message" class="ui error message">
          {{message}}
      </div>

      <!-- login form -->
      <form class="ui large form" v-bind:class="{ 'error': message }">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="login" type="text" name="login" placeholder="E-mail lub nick" v-on:keyup.13="loginUser"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="password" type="password" name="password" placeholder="Hasło" v-on:keyup.13="loginUser"/>
            </div>
          </div>
        <div v-on:click="loginUser" class="ui fluid large teal submit button">Login</div>
        
        <div class="ui horizontal divider">
          lub zaloguj sie przez
        </div>     
        <a class="ui fluid large blue button" v-bind:href="facebookAddress">Facebook</a>
        <p>
          Nie publikujemy bez twojej zgody
        </p>
   
        </div>
      </form>
      
      
      <div class="inline">
        <a class="l" v-link="'register'">Załóż konto</a>
        <a class="r" v-link="'resetPasswordRequest'">Resetuj hasło</a>
      </div>

      <div class="ui message">
        <p>
          Zalogowanie oznacza akceptację aktualnego <a v-link="{ path: '/terms' }">regulaminu</a> serwisu.
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'
import social from './socialplugin'
import {startPolling} from './utils/backendEventsPoller'

export default {
  data () {
    return {
      login: 'rambo',
      password: 'pass',
      message: '',
      loading: false,
      facebookAddress: social.fbLoginUrl()
    }
  },
  components: {
    LoadingBox
  },
  methods: {
    loginUser: function () {
      this.loading = true
      api.login(this.login, this.password, (result) => {
        this.loading = false
        if (result.success) {
          session.create(result.userId, result.jwt)
          startPolling()
          this.$dispatch('logged', {logged: true})
          const backUrl = session.getBackUrl()
          this.$router.go(backUrl || {'path': '/myAccount'})
          this.$dispatch('logged', {logged: true})
        } else {
          this.message = 'Podałeś niepoprawny login lub email'
        }
      })
    }
  },
  ready: function () {
    const facebookCode = this.$route.query.code
    if (facebookCode) {
      // facebook returned with code
      this.loading = true
      api.loginWithFacebook(facebookCode, (result) => {
        this.loading = false
        if (result.success) {
          session.create(result.userId, result.jwt)
          startPolling()
          this.$dispatch('logged', {logged: true})
          const backUrl = session.getBackUrl()
          this.$router.go(backUrl || {'path': '/myAccount'})
        } else {
          session.reset()
          this.message = 'Problem z logowaniem do facebook'
        }
      })
    }
  }
}
</script>
