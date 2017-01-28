<template>
  <loading-box :show="loading"></loading-box>
  <div class="ui middle aligned center aligned grid login">
    <div class="column">

      <!-- login form -->
      <form class="ui large form" v-bind:class="{ 'error': message }">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="email" type="text" name="email" placeholder="E-mail" v-on:keyup.13="login"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="password" type="password" name="password" placeholder="Hasło" v-on:keyup.13="login"/>
            </div>
          </div>
        <div v-on:click="login" class="ui fluid large teal submit button">Login</div>
        
        <div class="ui horizontal divider">
          lub zaloguj sie przez
        </div>     
        <a class="ui fluid large blue button" v-bind:href="facebookAddress">Facebook</a>
        <p>
          Nie publikujemy bez twojej zgody
        </p>
   
        </div>
        <div class="ui error message">
          {{message}}
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
      email: 'john@wp.pl',
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
    login: function () {
      this.loading = true
      api.login(this.email, this.password, (result) => {
        this.loading = false
        if (result.success) {
          session.create(result.userId, result.jwt)
          startPolling()
          const backUrl = session.getBackUrl()
          this.$router.go(backUrl || {'path': '/myAccount'})
        } else {
          session.reset()
          this.message = 'Podałeś złe hasło lub email'
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
