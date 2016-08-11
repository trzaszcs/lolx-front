<template>
  <div class="item">
   <div class="content">
    {{anounce.title}}
    {{anounce.desc}}
   </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      anounce: {
        title: '',
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
