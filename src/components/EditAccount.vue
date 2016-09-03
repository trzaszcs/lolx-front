<template>
  <div class="ui container register">
    <div class="ui segment">

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
        <div class="field" v-bind:class="{'error': hasFieldError('firstName')}">
          <label>Imie</label>
          <input v-model="firstName" placeholder="Imie"/>
        </div>

        <div class="field" v-bind:class="{'error': hasFieldError('lastName')}">
          <label>Nazwisko</label>
          <input v-model="lastName" placeholder="Nazwisko"/>
        </div>
      </div>
      
      <div class="field">
        <label>Adres</label>
         <div class="fields">
          <div class="field" v-bind:class="{'error': hasFieldError('state')}">
           <select v-model="state">
             <option value="">Województwo</option>
             <option v-for="state in states">
               {{ state }}
             </option>
           </select>
          </div>
          <div class="field" v-bind:class="{'error': hasFieldError('city')}">
           <input v-model="city" type="text" name="city" placeholder="Miasto">
          </div>
      </div>

      <input v-on:click="save" type="submit" class="ui primary button" value="Zmień"></input>
      </form>
    </div> 
  </div>
</div>

  </div>
</template>

<script>
import api from '../api'
import session from '../session'
import {states} from '../const'
import LoadingBox from './LoadingBox.vue'

export default {
  props: ['firstName', 'lastName', 'state', 'city'],
  components: {
    LoadingBox
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
      api.updateUserDetails(this.firstName, this.lastName, this.state, this.city, session.getUserId(), session.getJwt(), (response) => {
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

      if (!this.city) {
        append('city', 'Miasto jest wymagane')
      }

      if (!this.state) {
        append('state', 'Województwo jest wymagane')
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
  }
}
</script>
