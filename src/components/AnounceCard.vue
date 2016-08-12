<template>
   <div class="ui container">
     <div class="segment">
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
            <div class="ui basic green button">Zamów</div>
            <div class="ui basic red button">Anuluj</div>
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
  },
  events: {
    'showAnounce': function (selectedItem) {
      console.log('show -> ', selectedItem.anounce)
      this.anounce = selectedItem.anounce
    }
  }
}
</script>
