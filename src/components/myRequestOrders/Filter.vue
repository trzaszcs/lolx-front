<template>

  <div class="filter">
    <label>Status</label>
    <select v-model="status" class="ui dropdown">
      <option value="ALL">Wszystkie</option>
      <option value="WAITING">Oczekujący</option>
      <option value="ACCEPTED">Zaakceptowany</option>
      <option value="REJECTED">Odrzucony</option>
    </select>
  </div>

</template>
<script>
import $ from 'jquery'

export default {
  data () {
    return {
      status: 'ALL'
    }
  },
  methods: {
  },
  ready: function () {
    $('.ui.dropdown').dropdown()
  },
  watch: {
    status: function (newV) {
      if (newV) {
        this.$dispatch('filterChanged', {status: this.status})
      }
    }
  }
}
</script>