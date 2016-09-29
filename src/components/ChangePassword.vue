<template>
  <div class="ui container changePassword">

    <loading-box :show="saving"></loading-box>
   
    <div v-if="saved && passwordChangedSuccessfully" class="ui info message">
      <p>
        Hasło zostało zmodyfikowane
      </p>
    </div>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
    
      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>
      
      <div class="fields">
        <div class="field" v-bind:class="{'error': hasFieldError('oldPassword1')}">
          <label>Obecne hasło</label>
          <input v-model="oldPassword1" type="password"/>
        </div>
      </div>
      
      <div class="fields">
        <div class="field" v-bind:class="{'error': hasFieldError('oldPassword2')}">
          <label>Obecne hasło ponownie</label>
          <input v-model="oldPassword2" type="password"/>
        </div>
      </div>

      <div class="fields">
        <div class="field" v-bind:class="{'error': hasFieldError('newPassword')}">
          <label>Nowe hasło</label>
          <input v-model="newPassword" type="password"/>
        </div>
      </div>

      <input v-on:click="save" type="submit" class="ui teal button" value="Zmień"></input>
      </form>
  </div>
</div>

  </div>
</template>

<script>
import api from '../api'
import session from '../session'
import LoadingBox from './LoadingBox.vue'

export default {
  components: {
    LoadingBox
  },
  data () {
    return {
      oldPassword1: '',
      oldPassword2: '',
      newPassword: '',
      saving: false,
      saved: false,
      passwordChangedSuccessfully: false,
      validationErrors: null
    }
  },
  methods: {
    afterSave: function (success) {
      this.saved = true
      this.saving = false
      this.passwordChangedSuccessfully = success
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.changePassword(this.oldPassword1, this.newPassword, session.getUserId(), session.getJwt(), (response) => {
        if (response.success) {
        } else if (response.wrongOldPassword) {
          this.validationErrors.push({none: '', txt: 'Błędne stare hasło'})
        } else {
          this.validationErrors.push({none: '', txt: 'Błąd, Nie zmieniono hasła'})
        }
        this.afterSave(response.success)
      })
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.oldPassword1) {
        append('oldPassword1', 'Stare hasło jest wymagane')
      }
      if (this.oldPassword1 !== this.oldPassword2) {
        append('old-password', 'Hasła nie są takie same')
      }

      if (!this.newPassword) {
        append('newPassword', 'Nowe hasło jest wymagane')
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