<template>
  <div class="ui container resetPasswordRequest">
    <div class="ui segment">

    <loading-box :show="saving"></loading-box>
   
    <div v-if="saved && success" class="ui info message">
      <ul class="list">
        <li>Hasło zostało zresetowane, link został wysłany na Twój email</li>
      </ul>
    </div>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      <h4 class="ui dividing header">Zresetuj hasło</h4>

      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field" v-bind:class="{'error': hasFieldError('email')}">
        <label>Podaj swój email</label>
        <input v-model="email" placeholder="email@domena.pl"/>
      </div>

      <input v-on:click="save" type="submit" class="ui primary button" value="Resetuj"></input>
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
      email: '',
      saving: false,
      saved: false,
      success: false,
      validationErrors: null
    }
  },
  methods: {
    afterSave: function (success) {
      this.email = ''
      this.saved = true
      this.saving = false
      this.success = success
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.resetPassword(this.email, (response) => {
        if (!response.success) {
          this.validationErrors = [{txt: 'Błędny email'}]
        }
        this.afterSave(response.success)
      })
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})

      if (!this.email) {
        append('email', 'Email jest wymagany')
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
