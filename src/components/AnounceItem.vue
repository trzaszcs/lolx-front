<template>
  <div class="item">
   <div class="image">
        <img src="../assets/plumber.png">
   </div>
   <div class="content">
      <a class="header" v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
        {{anounce.title}}
      </a>
      <div class="description">
        {{anounce.price}} zł
      </div>
      <div class="extra">
        {{anounce.city}} ({{anounce.state}}) <br/>
        {{creationDate()}}
      </div>
   </div>
 </div>
</template>

<script>
export default {
  props: ['anounce'],
  data () {
    return {
      creationDate: function () {
        const anounceDate = new Date(this.anounce.creationDate)
        const diff = new Date() - anounceDate
        const oneHour = 60 * 60 * 1000
        const hours = diff / oneHour
        const days = hours / 24
        const timeStr = () => {
          const twoDigits = (value) => { return ('0' + value).slice(-2) }
          const hours = twoDigits(anounceDate.getHours())
          const minutes = twoDigits(anounceDate.getMinutes())
          return `${hours}:${minutes}`
        }
        if (hours < 24) {
          return `dziś ${timeStr()}`
        } else if (hours < 48) {
          return `wczoraj ${timeStr()}`
        } else {
          return `${days} dni temu`
        }
      }
    }
  },
  methods: {
  }
}
</script>
