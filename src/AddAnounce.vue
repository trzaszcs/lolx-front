<template>
  <div class="ui container addAnounce">
    <div class="ui segment">
    <loading-box :show="loading"></loading-box>
   
    <div v-if="saved" class="ui info message">
      <div class="header">
        Twój wpis został zapisany
      </div>
      <p>
        Ogłoszenie zostało utworzone i zostanie opublikowane w ciągu 5 minut.
      <p>
    </div>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      <h4 class="ui dividing header">Dodaj ogłoszenie</h4>

      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('title')}">
        <label>Tytuł</label>
        <input v-model="title" type="text" name="title" placeholder="Tytuł ogłoszenia"/>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('description')}">
        <label>Opis</label>
        <textarea v-model="description" name="descripion"></textarea>
      </div>

      <div class="five wide field required" v-bind:class="{'error': hasFieldError('price')}">
        <label>Cena</label>
        <div class="ui right labeled input">
          <input v-model="price" type="text" placeholder="Cena.." v-on:change="onPriceChange" maxlength="6"/>
          <div class="ui basic label">
            zł
          </div>
        </div>
      </div>
      
      <div class="eleven wide field required" v-bind:class="{'error': hasFieldError('location')}">
        <label>Lokalizacja</label>
        <location-input :location="location"></location-input>
      </div>
        
      <input v-on:click="save($event)" type="submit" class="ui primary button" value="Zapisz"></input>
      </form>
      <p></p>
</div>
</div>

  </div>
</template>

<script>
import api from './api'
import session from './session'
import LoadingBox from './components/LoadingBox.vue'
import LocationInput from './components/LocationInput.vue'

export default {
  components: {
    LoadingBox,
    LocationInput
  },
  data () {
    return {
      title: '',
      description: '',
      price: null,
      location: {title: ''},
      loading: false,
      saved: false,
      validationErrors: null
    }
  },
  methods: {
    afterSave: function () {
      this.title = ''
      this.description = ''
      this.price = null
      this.location = {title: ''}
      this.validationErrors = null
      this.saved = true
      this.loading = false
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.loading = true
      api.add(
        this.title,
        this.description,
        this.price,
        this.location,
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
      if (!this.price) {
        append('price', 'Cena jest wymagana')
      } else {
        const price = parseFloat(this.price)
        if (!price) {
          append('price', 'Niepoprawna cena')
        } else if (price <= 0) {
          append('price', 'Cena jest niepoprawna')
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
    },
    onPriceChange: function () {
      this.price = this.price.replace(',', '.')
    }
  },
  ready: function () {
    if (!session.logged()) {
      session.setBackUrl(this.$route)
      this.$router.go({path: '/login'})
      return
    }
    this.loading = true
    api.userDetails(session.getUserId(), session.getJwt(), (details) => {
      this.location = details.location
      this.loading = false
    })
  },
  events: {
    'location': function (location) {
      this.location = location
    }
  }
}
</script>
