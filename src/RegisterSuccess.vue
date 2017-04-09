<template>
  <div class="ui container register">
    <div class="ui segment">

      <h3>Konto zostało założone</h3>

      <div>
        Aby założyć konto pracownika <a href="" v-link="{path: 'myAccount', query: {section: 'account', createWorker: 'true'}}">kliknij</a>
      <div>

      <div>
        Aby się zalogować klinij <a href="" v-link="{path: 'login'}">link</a>
      </div>
     
    </div>
  </div>

</template>

<script>
export default {
  components: {
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
