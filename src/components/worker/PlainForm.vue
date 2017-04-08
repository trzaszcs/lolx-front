<template>
    <form class="ui form" v-bind:class="{ 'error': validationErrors }">
      
      <div class="ui error message">
        <ul class="list" v-for="error in validationErrors">
          <li>{{error.txt}}</li>
        </ul>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('description')}">
        <label>Twój opis</label>
        <textarea v-model="worker.description" placeholder="Opis" rows="3"></textarea>
      </div>

      <div class="field required" v-bind:class="{'error': hasFieldError('categories')}">
        <label>Twoje specjalizacje</label>
        <multi-categories :selected-categories="worker.categories"></multi-categories>
      </div>

      <input v-on:click="save" type="submit" class="ui primary button" v-bind:value="submitLabel()"></input>
    </form>
</template>

<script>
import MultiCategories from './MultiCategories.vue'

export default {
  props: ['worker'],
  components: {
    MultiCategories
  },
  data () {
    return {
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
      this.$dispatch('workerSavedEvent', {worker: this.worker})
    },
    validate: function (event) {
      let errors = []
      const append = (fieldName, description) => errors.push({name: fieldName, txt: description})
      if (!this.worker.description) {
        append('description', 'Opis jest wymagany')
      }
      if (!this.worker.categories || this.worker.categories.length === 0) {
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
    },
    submitLabel: function () {
      return this.worker.id ? 'Zapisz' : 'Utwórz'
    }
  },
  events: {
    'categorySelected': function (event) {
      this.worker.categories = event.ids
    }
  }
}
</script>