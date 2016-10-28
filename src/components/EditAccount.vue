<template>
  <div class="ui container register">

    <loading-box :show="saving"></loading-box>
   
    <div v-if="saved" class="ui info message">
      <p>
        Dane zostały zmodyfikowane
      </p>
    </div>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
    
      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>
      <div class="fields">
        <div class="field required" v-bind:class="{'error': hasFieldError('firstName')}">
          <label>Imie</label>
          <input v-model="firstName" placeholder="Imie"/>
        </div>

        <div class="field required" v-bind:class="{'error': hasFieldError('lastName')}">
          <label>Nazwisko</label>
          <input v-model="lastName" placeholder="Nazwisko"/>
        </div>
      </div>
      
      <div class="fields">
        <div class="field required" v-bind:class="{'error': hasFieldError('email')}">
          <label>Email</label>
          <input v-model="email" placeholder="email@domena.pl"/>
        </div>

        <div class="field required">
          <label>Telefon</label>
          <div class="ui labeled input">
            <div class="ui label">
              +48
            </div>
            <input v-model="phone" placeholder="Nr tel">
          </div>
        </div>

      </div>

      

      <div class="field required" v-bind:class="{'error': hasFieldError('location')}">
        <label>Lokalizacja</label>
        <location-input :location="location"></location-input>
      </div>

      <input v-on:click="save" type="submit" class="ui teal button" value="Zmień"></input>
      </form>
    </div> 
</div>

  </div>
</template>

<script>
import api from '../api'
import util from '../util'
import session from '../session'
import {states} from '../const'
import LoadingBox from './LoadingBox.vue'
import LocationInput from './LocationInput.vue'

export default {
  props: ['firstName', 'lastName', 'location', 'email', 'phone'],
  components: {
    LoadingBox,
    LocationInput
  },
  data () {
    return {
      saving: false,
      saved: false,
      validationErrors: null,
      states: states
    }
  },
  methods: {
    afterSave: function () {
      this.saved = true
      this.saving = false
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.updateUserDetails(this.email, this.phone, this.firstName, this.lastName, this.location, session.getUserId(), session.getJwt(), (response) => {
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
        append('email', 'Email nie jest poprawny')
      } else {
        if (!util.emailValid(this.email)) {
          append('email', 'Email jest niepoprawny')
        }
      }

      if (!this.phone) {
        append('phone', 'Telefon jest wymagany')
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
