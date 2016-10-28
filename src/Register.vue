<template>
  <div class="ui container register">
    <div class="ui segment">

    <loading-box :show="saving"></loading-box>

    <info-box :visible="saved" :header="'Rejestracja konta'" :message="'Konto zostało założone pomyślnie'"></info-box>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      <h4 class="ui dividing header">Zarejestruj konto</h4>

      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('firstName')}">
        <label>Imie</label>
        <input v-model="firstName" placeholder="Imie"/>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('lastName')}">
        <label>Nazwisko</label>
        <input v-model="lastName" placeholder="Nazwisko"/>
      </div>
      
      <div class="field required" v-bind:class="{'error': hasFieldError('location')}">
        <label>Lokalizacja</label>
        <location-input :location="location" :simple="false"></location-input>
      </div>
      
      <div class="field required" v-bind:class="{'error': hasFieldError('email')}">
        <label>E-mail</label>
        <input v-model="email" placeholder="Email"/>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('phone')}">
        <label>Telefon</label>
        <div class="ui labeled input">
          <div class="ui label">
            +48
          </div>
          <input v-model="phone" placeholder="Nr tel">
        </div>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('password1')}">
        <label>Hasło</label>
        <input v-model="password1" type="password"/>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('password2')}">
        <label>Powtórzone hasło</label>
        <input v-model="password2" type="password"/>
      </div>

      <input v-on:click="save" type="submit" class="ui primary button" value="Zarejestruj"></input>
      </form>
    </div> 
  </div>
</div>

  </div>
</template>

<script>
import api from './api'
import util from './util'
import LoadingBox from './components/LoadingBox.vue'
import LocationInput from './components/LocationInput.vue'
import InfoBox from './components/InfoBox.vue'

export default {
  components: {
    LoadingBox,
    LocationInput,
    InfoBox
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password1: null,
      password2: null,
      location: {title: ''},
      saving: false,
      saved: false,
      validationErrors: null
    }
  },
  methods: {
    afterSave: function () {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
      this.password1 = ''
      this.password2 = ''
      this.location = {title: ''}
      this.saved = true
      this.saving = false
      this.validationErrors = null
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.register(this.firstName, this.lastName, this.email, this.phone, this.password1, this.location, (response) => {
        this.afterSave()
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
      if (!this.email) {
        append('email', 'Email jest wymagany')
      } else {
        if (!util.emailValid(this.email)) {
          append('email', 'Email jest niepoprawny')
        }
      }

      if (!this.phone) {
        append('phone', 'Telefon jest wymagany')
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
