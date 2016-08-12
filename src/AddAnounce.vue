<template>
  <div class="ui container addAnounce">
    <div class="ui segment">

    <div v-if="saving" class="loadingScreen"></div>

    <div v-id="saved" class="ui info message">
      <i class="close icon"></i>
      <div class="header">
        Twój wpis został zapisany
      </div>
      <ul class="list">
        <li>Twój wpis został zapisany i zostanie opublikowany w ciągu 5 minut.</li>
      </ul>
    </div>

    <form class="ui form">
      <h4 class="ui dividing header">Dodaj ogłoszenie</h4>
      
      <div class="field">
        <label>Tytuł</label>
        <input v-model="title" type="text" name="title" placeholder="Tytuł ogłoszenia">
      </div>

      <div class="field">
        <label>Opis</label>
        <textarea v-model="description" name="descripion"></textarea>
      </div>
      
      <div class="field">
        <label>Adres</label>
         <div class="fields">
          <div class="four wide field">
           <input v-model="state" type="text" name="state" placeholder="Województwo">
          </div>
          <div class="twelve wide field">
           <input v-model="city" type="text" name="city" placeholder="Miasto">
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

export default {
  data () {
    return {
      title: '',
      description: '',
      city: '',
      state: '',
      saving: false,
      saved: false
    }
  },
  methods: {
    save: function (event) {
      event.preventDefault()
      this.saving = true
      api.add(this.title, this.description, this.city, this.state, (response) => {
        this.saved = true
        this.saving = false
      })
    }
  }
}
</script>

<style scoped>
</style>

