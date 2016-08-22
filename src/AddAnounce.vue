<template>
  <div class="ui container addAnounce">
    <div class="ui segment">

    <loading-box :show="saving"></loading-box>
   
    <div v-if="saved" class="ui info message">
      <div class="header">
        Twój wpis został zapisany
      </div>
      <ul class="list">
        <li>Twój wpis został zapisany i zostanie opublikowany w ciągu 5 minut.</li>
      </ul>
    </div>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      <h4 class="ui dividing header">Dodaj ogłoszenie</h4>

      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field" v-bind:class="{'error': hasFieldError('title')}">
        <label>Tytuł</label>
        <input v-model="title" type="text" name="title" placeholder="Tytuł ogłoszenia"/>
      </div>

      <div class="field" v-bind:class="{'error': hasFieldError('description')}">
        <label>Opis</label>
        <textarea v-model="description" name="descripion"></textarea>
      </div>
      
      <div class="field">
        <label>Adres</label>
         <div class="fields">
          <div class="four wide field" v-bind:class="{'error': hasFieldError('state')}">
           <select v-model="state">
             <option value="">Województwo</option>
             <option v-for="state in states" v-bind:value="state">
               {{ state }}
             </option>
           </select>
          </div>
          <div class="twelve wide field" v-bind:class="{'error': hasFieldError('city')}">
           <input v-model="city" type="text" name="city" placeholder="Miasto"/>
          </div>
      </div>
      
      <input v-on:click="save($event)" type="submit" class="ui primary button" value="Zapisz"></input>
      </form>
    </div> 
  </div>
</div>

  </div>
</template>

<script>
import api from './api'
import session from './session'
import {states} from './const'
import LoadingBox from './components/LoadingBox.vue'

export default {
  components: {
    LoadingBox
  },
  data () {
    return {
      title: '',
      description: '',
      city: '',
      state: '',
      saving: false,
      saved: false,
      validationErrors: null,
      states: states
    }
  },
  methods: {
    afterSave: function () {
      this.title = ''
      this.description = ''
      this.city = ''
      this.state = ''
      this.validationErrors = null
      this.saved = true
      this.saving = false
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.saving = true
      api.add(
        this.title,
        this.description,
        this.city,
        this.state,
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
      if (!this.title) {
        append('title', 'Tytuł jest wymagany')
      }
      if (!this.description) {
        append('description', 'Opis jest wymagany')
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
  },
  ready: function () {
    if (!session.logged()) {
      session.setBackUrl(this.$route)
      this.$router.go({path: '/login'})
      return
    }
  }
}
</script>
