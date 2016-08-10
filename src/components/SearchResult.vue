<template>
  <div class="search-result ui container">
    <div class="segment">
      Result for '{{queryString()}}'
    </div>
    
    <div class="ui middle aligned selection list">
      <div class="item">
        <img class="ui avatar image" src="../assets/plumber.png">
        <div class="content">
          <div class="header">Przepcham rurę</div>
          <div class="description">Last seen watching <a><b>Arrested Development</b></a> just now.</div>
        </div>
      </div>
      <div class="item">
        <img class="ui avatar image" src="../assets/plumber.png">
        <div class="content">
          <div class="header">Wymienię zlew</div>
          <div class="description">Last seen watching <a><b>Arrested Development</b></a> just now.</div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  props: ['searchQuery'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    queryString: function () {
      return this.searchQuery.phrase
    }
  }
}
</script>
