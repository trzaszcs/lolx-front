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
              <input v-model="email" type="text" name="email" placeholder="E-mail"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="password" type="password" name="password" placeholder="Hasło"/>
            </div>
          </div>
        <div v-on:click="login" class="ui fluid large teal submit button">Login</div>
        </div>
        <div class="ui error message">
          {{message}}
        </div>
      </form>
      <div class="ui message">
        Zaloguj sie przez <a v-bind:href="facebookAddress">Facebook</a><br/>
        Nie posiadasz konta? <a v-on:click="register">Załóż konto</a>
      </div>

    </div>
  </div>
</template>

<script>
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'

export default {
  data () {
    return {
      email: 'john@wp.pl',
      password: 'pass',
      message: '',
      loading: false,
      facebookAddress: this.buildFacebookLoginAddress()
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
          const backUrl = session.getBackUrl()
          this.$router.go(backUrl || {'path': '/myAccount'})
        } else {
          session.reset()
          this.message = 'Podałeś złe hasło lub email'
        }
      })
    },
    register: function () {
      this.$router.go({'path': '/register'})
    },
    buildFacebookLoginAddress: function () {
      const appId = '1069849489717317'
      const redirectUrl = 'http://lolx-front.herokuapp.com/login'
      const version = 2.7
      const scope = 'email,public_profile'

      return `https://www.facebook.com/v${version}/dialog/oauth?client_id=${appId}&response_type=code&sdk=jssdk&redirect_uri=${redirectUrl}&scope=${scope}`
    }
  },
  ready: function () {
    const facebookCode = this.$route.query('code')
    if (facebookCode) {
      // facebook returned with code
      api.loginWithFacebook(facebookCode, (result) => {
        session.create(result.userId, result.jwt)
        const backUrl = session.getBackUrl()
        this.$router.go(backUrl || {'path': '/myAccount'})
      })
    }
  }
}
</script>
