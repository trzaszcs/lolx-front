<template>
  <div class="ui changePassword">

    <loading-box :show="saving"></loading-box>




    <info-box :visible="saved && passwordChangedSuccessfully"
      :message="'Hasło zostało zmienione'"></info-box>
 
    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
    
               <div class="ui header">
              <i class="ui edit icon"></i>
                Zmiana hasła
          </div>
          
          <div class="ui divider"></div>
    
      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>
      
      <div class="fields required">
        <div class="field" v-bind:class="{'error': hasFieldError('oldPassword')}">
          <label>Obecne hasło</label>
          <input v-model="oldPassword" type="password"/>
        </div>
      </div>
      
      <div class="fields required">
        <div class="field" v-bind:class="{'error': hasFieldError('newPassword1')}">
          <label>Nowe hasło</label>
          <input v-model="newPassword1" type="password"/>
        </div>
      </div>

      <div class="fields required">
        <div class="field" v-bind:class="{'error': hasFieldError('newPassword2')}">
          <label>Nowe hasło ponownie</label>
          <input v-model="newPassword2" type="password"/>
        </div>
      </div>

      <input v-on:click="save" type="submit" class="ui button" value="Zmień"></input>
      </form>
</div>
</div>
  </div>
</template>

<script>
import api from '../api'
import session from '../session'
import LoadingBox from './LoadingBox.vue'
import InfoBox from './InfoBox.vue'

export default {
  components: {
    LoadingBox,
    InfoBox
  },
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
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
      this.oldPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.changePassword(this.oldPassword, this.newPassword1, session.getUserId(), session.getJwt(), (response) => {
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
      if (!this.oldPassword) {
        append('oldPassword', 'Stare hasło jest wymagane')
      }
      if (this.newPassword1 !== this.newPassword2) {
        append('new-password', 'Hasła nie są takie same')
      }

      if (!this.newPassword1) {
        append('newPassword1', 'Nowe hasło jest wymagane')
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