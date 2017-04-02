<template>
    <div class="ui container register">
      <h4 class="ui dividing header">Dane pracownika</h4>
      <worker-form :new="true"></worker-form> 
    </div>
</template>

<script>
import WorkerForm from './Form.vue'

export default {
  components: {
    WorkerForm
  },
  data () {
    return {
    }
  },
  methods: {
  },
  events: {
  }
}
</script>
