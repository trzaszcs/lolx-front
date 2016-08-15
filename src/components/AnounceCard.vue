<template>
   <div class="ui container">
     <div class="ui segment">
         <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="../assets/plumber.png">
            <div class="header">
              {{anounce.title}}
            </div>
            <div class="meta">
              Jan Kowalski - {{anounce.city}} - {{anounce.state}}
            </div>
            <div class="description">
              {{anounce.desc}}
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button" v-on:click="emitOrderEvent()">Zamów</div>
              <div class="ui basic red button" v-on:click="emitCloseEvent()">Anuluj</div>
            </div>
          </div>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      anounce: {
        title: '',
        city: '',
        state: '',
        img: '',
        desc: ''
      }
    }
  },
  methods: {
    emitOrderEvent: function () {
      this.$dispatch('emitOrderEvent', {})
    },
    emitCloseEvent: function () {
      this.$dispatch('emitCloseEvent', {})
    }
  },
  events: {
    'showAnounce': function (selectedItem) {
      console.log('show -> ', selectedItem.anounce)
      this.anounce = selectedItem.anounce
    }
  }
}
</script>
