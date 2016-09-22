<template>
  <div class="item">
                 
    <div class="ui stackable grid">
      <div class="nine wide column">
        <h4 class="ui header">
          <a v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
            {{anounce.title}}
          </a>
        </h4>
      <div class="content">
        <div class="image">
          <img src="../assets/plumber.png">
        </div>
      </div>
      </div>
      <div class="five wide column">
        <h4 class="ui header">{{anounce.city}} ({{anounce.state}})</h4>
        <div class="content">
          {{creationDate()}}
        </div>
      </div>
      <div class="two wide right aligned column">
        <h4 class="ui header">Cena</h4>
        <div class="content">
          {{anounce.price}} zł
        </div>
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
