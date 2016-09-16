<template>
  <div class="ui container resetPassword">
    <div class="ui segment">

    <loading-box :show="saving"></loading-box>
   
    <div v-if="saved" class="ui info message">
      <ul class="list">
        <li>Hasło zostało zmienione</li>
      </ul>
    </div>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      <h4 class="ui dividing header">Zmień hasło</h4>
      
      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field" v-bind:class="{'error': hasFieldError('password1')}">
        <label>Hasło</label>
        <input v-model="password1" type="password"/>
      </div>

      <div class="field" v-bind:class="{'error': hasFieldError('password2')}">
        <label>Powtórzone hasło</label>
        <input v-model="password2" type="password"/>
      </div>

      <input v-on:click="save" type="submit" class="ui primary button" value="Zapisz"></input>
      </form>
    </div> 
  </div>
</div>

  </div>
</template>

<script>
import api from './api'
import LoadingBox from './components/LoadingBox.vue'

export default {
  components: {
    LoadingBox
  },
  data () {
    return {
      password1: null,
      password2: null,
      saving: false,
      saved: false,
      validationErrors: null
    }
  },
  methods: {
    afterSave: function () {
      this.password1 = ''
      this.password2 = ''
      this.saved = true
      this.saving = false
    },
    save: function (event) {
      event.preventDefault()
      if (!this.validate()) {
        return
      }
      this.saving = true
      api.changePasswordAfterReset(this.$route.query.id, this.password1, (response) => {
        this.afterSave()
      })
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
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
