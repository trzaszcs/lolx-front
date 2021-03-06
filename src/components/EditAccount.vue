<template>
  <div class="ui fluid card">

    <div class="ui top attached label">
      <i class="ui edit icon"></i>
      Moje dane
    </div>
         
    <div class="content">

      <div class="ui container register">

        <loading-box :show="loading"></loading-box>

        <info-box :visible="saved" :header="'Modyfikacja konta'" :message="'Dane zostały zmodyfikowane pomyślnie'"></info-box>

        <form class="ui form" v-bind:class="{ 'error': validationErrors }">
    
          <div class="ui error message">
            <ul class="list" v-for="error in validationErrors">
              <li>{{error.txt}}</li>
            </ul>
          </div>
          <div class="field required">
            <label class="required">Imie i nazwisko</label>
            <div class="two fields">
              <div class="field" v-bind:class="{'error': hasFieldError('firstName')}">
                <input v-model="user.firstName" placeholder="Imie"/>
              </div>
              <div class="field required" v-bind:class="{'error': hasFieldError('lastName')}">
                <input v-model="user.lastName" placeholder="Nazwisko"/>
              </div>
            </div>
          </div>

          <div class="two fields">
            <div class="field required" v-bind:class="{'error': hasFieldError('email')}">
              <label>Email</label>
              <input v-model="user.email" placeholder="email@domena.pl" type="email"/>
            </div>
            <div class="field required" v-bind:class="{'error': hasFieldError('location')}">
              <label>Lokalizacja</label>
              <location-input :location="user.location"></location-input>
            </div>
          </div>

          <input v-on:click="save" type="submit" class="ui button" value="Zapisz"></input>
        </form>
      </div> 
    </div>
  </div>

  <worker-account></worker-account>

</template>

<script>
import api from '../api'
import util from '../util'
import session from '../session'
import {states} from '../const'
import LoadingBox from './LoadingBox.vue'
import LocationInput from './LocationInput.vue'
import InfoBox from './InfoBox.vue'
import WorkerAccount from './worker/WorkerAccount.vue'

export default {
  components: {
    LoadingBox,
    LocationInput,
    InfoBox,
    WorkerAccount
  },
  data () {
    return {
      loading: false,
      saved: false,
      validationErrors: null,
      states: states,
      user: {location: {title: ''}}
    }
  },
  methods: {
    afterSave: function () {
      this.saved = true
      this.loading = false
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.loading = true
      api.updateUserDetails(
        this.user.email,
        this.user.firstName,
        this.user.lastName,
        this.user.location,
        session.getUserId(),
        session.getJwt(),
        (response) => {
          this.afterSave()
        }
      )
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.user.firstName) {
        append('firstName', 'Imie jest wymagane')
      }
      if (!this.user.lastName) {
        append('lastName', 'Nazwisko jest wymagane')
      }

      if (!this.user.email) {
        append('email', 'Email nie jest poprawny')
      } else {
        if (!util.emailValid(this.user.email)) {
          append('email', 'Email jest niepoprawny')
        }
      }
      if (!this.user.location || !this.user.location.title) {
        append('location', 'Lokalizacja jest wymagana')
      } else if (!this.user.location.latitude) {
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
      this.user.location = location
    }
  },
  ready: function () {
    this.loading = true
    api.userDetails(session.getUserId(), session.getJwt(), (user) => {
      this.user = user
      this.loading = false
    })
  }
}
</script>
