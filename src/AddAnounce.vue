<template>
  <div class="ui container addAnounce">
    <div class="ui segment">
    
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

    </div> 
  </div>
</div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      city: '',
      state: ''
    }
  },
  methods: {
    save: function (event) {
      event.preventDefault()
      const anouncement = {
        title: this.title,
        description: this.description,
        city: this.city,
        state: this.state
      }
      console.log('got submit:', anouncement)
    }
  }
}
</script>

<style scoped>
</style>

