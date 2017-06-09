<template>
  <div class="ui container addAnounce">
      <loading-box :show="loading"></loading-box>
        
      <form class="ui form" v-bind:class="{ 'error': validationErrors }">
        <h4 class="ui dividing header">Dodaj ogłoszenie</h4>

        <info-box :visible="newAnounceId" :header="'Twoje ogłoszenie zostało zapisane'">
          <p>
            Ogłoszenie zostało utworzone i zostanie opublikowane w ciągu 5 minut pod podany adresem <a v-bind:href="anounceAddress()">link</a>
          </p>
        </info-box>

        <div id="errorBox" class="ui error message">
            <ul class="list" v-for="error in validationErrors">
              <li>{{error.txt}}</li>
            </ul>
        </div>

        <div class="field required" v-bind:class="{'error': hasFieldError('title')}">
          <label style="color:gray">Tytuł</label>
          <input v-model="title" type="text" name="title" placeholder="Tytuł ogłoszenia"/>
        </div>

        <div class="field required" v-bind:class="{'error': hasFieldError('description')}">
          <label style="color:gray">Opis</label>
          <textarea v-model="description" name="descripion"></textarea>
        </div>

        <div class="five wide field required" v-bind:class="{'error': hasFieldError('price')}">
          <label style="color:gray">Cena</label>
          <div class="ui right labeled input">
            <input v-model="price" type="number" min="1" placeholder="Cena.." v-on:change="onPriceChange" maxlength="6"/>
            <div class="ui basic label">
              zł
            </div>
          </div>
        </div>

        <div class="seven wide field required" v-bind:class="{'error': hasFieldError('category')}">
          <label style="color:gray">Kategoria</label>
          <select v-model="categoryId" class="ui dropdown">
            <option value="">Kategoria...</option>
            <option  v-for="category in categories" v-bind:value="category.id">
              {{category.name}}
            </option>
          </select>
        </div>

        <div class="seven wide field required" v-bind:class="{'error': hasFieldError('duration')}">
          <label style="color:gray">Czas trwania</label>
          <select v-model="duration" class="ui dropdown">
            <option value="">Czas trwania...</option>
            <option  v-for="duration in durations" v-bind:value="duration.id">
              {{duration.name}}
            </option>
          </select>
        </div>

        <div class="eleven wide field required" v-bind:class="{'error': hasFieldError('location')}">
          <label style="color:gray">Lokalizacja</label>
          <location-input :location="location" :simple="false"></location-input>
        </div>

        <div class="ui field">
          <label style="color:gray">Zdjęcie</label>
          <upload></upload>
        </div>

        <input v-on:click="save($event)" type="submit" class="ui right floated button" value="Zapisz" style="width:50%;"></input>
      </form>
  </div>
</template>

<script>
import $ from 'jquery'
import api from './api'
import session from './session'
import {anounceDurations, categories} from './const'
import LoadingBox from './components/LoadingBox.vue'
import LocationInput from './components/LocationInput.vue'
import Upload from './components/Upload.vue'
import InfoBox from './components/InfoBox.vue'

export default {
  components: {
    LoadingBox,
    LocationInput,
    Upload,
    InfoBox
  },
  data () {
    return {
      title: '',
      description: '',
      price: null,
      location: {title: ''},
      imgName: null,
      categoryId: null,
      duration: 'SEVEN_DAYS',
      categories: categories,
      durations: anounceDurations,
      loading: false,
      newAnounceId: null,
      validationErrors: null
    }
  },
  methods: {
    scrollToErrorBox: function () {
      const position = document.getElementById('errorBox').getBoundingClientRect()
      window.scrollTo(position.left, position.top)
    },
    afterSave: function (anounceId) {
      this.title = ''
      this.description = ''
      this.price = null
      this.imgName = null
      this.duration = null
      this.contactPhone = null
      this.categoryId = null
      this.validationErrors = null
      this.newAnounceId = anounceId
      this.loading = false
      this.$broadcast('clear', {})
      $('.ui.dropdown').dropdown('clear')
    },
    save: function (event) {
      event.preventDefault()

      this.newAnouneId = null
      if (!this.validate()) {
        this.scrollToErrorBox()
        return
      }

      this.loading = true
      api.add(
        this.title,
        this.description,
        this.price,
        this.location,
        this.imgName,
        this.categoryId,
        this.duration,
        session.getUserId(),
        session.getJwt(),
        (response) => {
          this.afterSave(response.id)
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

      if (!this.categoryId) {
        append('category', 'Kategoria jest wymagana')
      }

      if (!this.duration) {
        append('duration', 'Czas trwania jest wymagany')
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
    },
    anounceAddress: function () {
      return '/#!/anounce?anounceId=' + this.newAnounceId
    },
    resetForm: function () {
      this.file = null
      this.fileSelected = false
      this.fileUploaded = false
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
      this.contactPhone = details.phone
      this.loading = false
    })

    $('.ui.dropdown').dropdown()
  },
  events: {
    'location': function (location) {
      this.location = location
    },
    'img-uploaded': function (file) {
      this.imgName = file ? file.imgName : null
    }
  }
}
</script>
