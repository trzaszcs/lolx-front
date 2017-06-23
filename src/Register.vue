<template>
  <div class="ui container register">

    <loading-box :show="saving"></loading-box>

    <form class="ui container form" v-bind:class="{ 'error': validationErrors }">
      <h2 class="ui dividing header">Zarejestruj konto</h2>

      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>
      <div class="ui two column fluid stackable grid" >

        <div class="six wide column">
          <div class="field required" v-bind:class="{'error': hasFieldError('firstName')}">
            <label style="color:gray;font-size:1.2em;margin-bottom:10px;">Imie</label>
            <input v-model="firstName" placeholder="Imie"/>
          </div>
        </div>

        <div class="six wide column">
          <div class="field required" v-bind:class="{'error': hasFieldError('lastName')}">
            <label style="color:gray;font-size:1.2em;margin-bottom:10px;">Nazwisko</label>
            <input v-model="lastName" placeholder="Nazwisko"/>
          </div>
        </div>

        <div class="six wide column">
          <div class="field required" v-bind:class="{'error': hasFieldError('nick')}">
            <label style="color:gray;font-size:1.2em;margin-bottom:10px;">Nazwa użytkownika</label>
            <input v-model="nick" placeholder="Twoja nazwa"/>
          </div>
        </div>

        <div class="six wide column">
          <div class="field required" v-bind:class="{'error': hasFieldError('location')}">
            <label style="color:gray;font-size:1.2em;margin-bottom:10px;">Lokalizacja</label>
            <location-input :location="location" :simple="false"></location-input>
          </div>
        </div>

        <div class="one column row">
          <div class="eight wide column">
            <div class="field required" v-bind:class="{'error': hasFieldError('email')}">
              <label style="color:gray;font-size:1.2em;margin-bottom:10px;">E-mail</label>
              <input v-model="email" placeholder="Email" type="email"/>
            </div>
          </div>
        </div>

        <div class="six wide column">
          <div class="field required" v-bind:class="{'error': hasFieldError('password1')}">
            <label style="color:gray;font-size:1.2em;margin-bottom:10px;">Hasło</label>
            <input v-model="password1" type="password"/>
          </div>
        </div>

        <div class="six wide column">
          <div class="field required" v-bind:class="{'error': hasFieldError('password2')}">
            <label style="color:gray;font-size:1.2em;margin-bottom:10px;">Powtórzone hasło</label>
            <input v-model="password2" type="password"/>
          </div>
        </div>

      </div>
  
      <input v-on:click="save" type="submit" class="ui right floated button" value="Zarejestruj" style="width:50%;"></input>
      </form>
  
  </div>

</template>

<script>
import api from './api'
import util from './util'
import LoadingBox from './components/LoadingBox.vue'
import LocationInput from './components/LocationInput.vue'

export default {
  components: {
    LoadingBox,
    LocationInput
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      nick: '',
      password1: null,
      password2: null,
      location: {title: ''},
      saving: false,
      saved: false,
      validationErrors: null
    }
  },
  methods: {
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.register(this.firstName, this.lastName, this.nick, this.email, this.password1, this.location, (response) => {
        this.$router.go({path: 'registerSuccess'})
      })
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.firstName) {
        append('firstName', 'Imie jest wymagane')
      }
      if (!this.lastName) {
        append('lastName', 'Nazwisko jest wymagane')
      }
      if (!this.nick) {
        append('nick', 'Nazwa użytkownika jest wymagana')
      }
      if (!this.email) {
        append('email', 'Email jest wymagany')
      } else {
        if (!util.emailValid(this.email)) {
          append('email', 'Email jest niepoprawny')
        }
      }

      let passwordsFilled = true

      if (!this.password1) {
        append('password1', 'Hasło jest wymagane')
        passwordsFilled = false
      }

      if (!this.password2) {
        append('password2', 'Powórzone hasło jest wymagane')
        passwordsFilled = false
      }

      if (passwordsFilled) {
        if (this.password1 !== this.password2) {
          append('passwords', 'Hasła nie są takie same')
        }
      }

      if (!this.location || !this.location.title) {
        append('location', 'Lokalizacja jest wymagana')
      } else if (!this.location.latitude) {
        append('location', 'Podana lokalizacja nie została znaleziona, spróbuj jeszcze raz')
      }

      if (errors.length > 0) {
        this.validationErrors = errors
        return false
      }
      return true
    },
    hasFieldError: function (fieldName) {
      if (this.validationErrors) {
        return this.validationErrors.some((errorMessage) => {
          return errorMessage.name === fieldName
        })
      }
      return false
    }
  },
  events: {
    'location': function (location) {
      this.location = location
    }
  }
}
</script>
