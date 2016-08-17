<template>
  <div class="ui middle aligned center aligned grid login">
    <div class="column">

      <!-- login form -->
      <form class="ui large form" v-bind:class="{ 'error': message }">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="email" type="text" name="email" placeholder="E-mail">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="password" type="password" name="password" placeholder="Hasło">
            </div>
          </div>
        <div v-on:click="login" class="ui fluid large teal submit button">Login</div>
        </div>
        <div class="ui error message">
          {{message}}
        </div>
      </form>
      
      <div class="ui message">
        Nie posiadasz konta? <a v-on:click="register">Załóż konto</a>
      </div>

    </div>
  </div>

</template>

<script>
import api from './api'
import session from './session'

export default {
  data () {
    return {
      email: 'john@wp.pl',
      password: 'pass',
      message: ''
    }
  },
  components: {
  },
  methods: {
    login: function () {
      api.login(this.email, this.password, (result) => {
        if (result.success) {
          session.setJwt(result.jwt)
          this.$router.go({'path': '/myAccount'})
        } else {
          session.reset()
          this.message = 'Podano złe hasło lub email'
        }
      })
    },
    register: function () {
      this.$router.go({'path': '/register'})
    }
  }
}
</script>
