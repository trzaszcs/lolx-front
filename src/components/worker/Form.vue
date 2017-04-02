<template>
  <div class="ui segment">

    <loading-box :show="saving"></loading-box>

    <info-box :visible="saved" :message="'Dane pracownika zostały zapisane'"></info-box>

    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      
      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('description')}">
        <label>Twój opis</label>
        <textarea v-model="worker.description" placeholder="textarea"></textarea>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('categories')}">
        <label>Twoje specjalizacje</label>
        <multi-categories :selected-categories="worker.categories"></multi-categories>
      </div>

      <input v-on:click="save" type="submit" class="ui primary button" value="Zarejestruj"></input>
    </form>
  </div>
</template>

<script>
import api from '../../api'
import session from '../../session'
import LoadingBox from '../LoadingBox.vue'
import InfoBox from '../InfoBox.vue'
import MultiCategories from './MultiCategories.vue'

const buildWorker = (id, description, categories) => {
  return {id, description, categories}
}

const emptyWorker = () => {
  return buildWorker(null, '', [])
}

export default {
  props: ['new'],
  components: {
    LoadingBox,
    InfoBox,
    MultiCategories
  },
  data () {
    return {
      worker: emptyWorker(),
      saving: false,
      saved: false,
      validationErrors: null
    }
  },
  methods: {
    afterSave: function () {
      this.saved = true
      this.saving = false
      this.validationErrors = null
    },
    save: function (event) {
      event.preventDefault()

      if (!this.validate()) {
        return
      }
      this.saving = true
      const userId = session.getUserId()
      const jwt = session.getJwt()
      if (this.worker.id) {
        api.updateWorker(this.worker.id, userId, this.worker.description, this.worker.categories, jwt, (response) => {
          this.afterSave()
        })
      } else {
        api.createWorker(userId, this.worker.description, this.worker.categories, jwt, (response) => {
          this.woker.id = response.id
          this.afterSave()
        })
      }
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.worker.description) {
        append('description', 'Opis jest wymagany')
      }
      if (!this.worker.categories && this.worker.categories.length === 0) {
        append('categories', 'Kategorie są wymagane')
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
      this.$router.go({ path: '/login' })
      return
    }
    api.getWorkerForUser(session.getUserId(), session.getJwt(), (response) => {
      if (response.found) {
        this.worker = buildWorker(response.id, response.description, response.categoryIds)
      } else {
        this.worker = emptyWorker()
      }
    })
  },
  events: {
    'categorySelected': function (event) {
      console.log('--->', event)
      this.worker.categories = event.ids
    }
  }
}
</script>
