<template>
  <div class="search-result ui container">
    <div class="segment">
      Result for '{{queryString()}}'
    </div>

    <div class="ui middle aligned selection list">
      <div v-for="item in items" class="item">
        <img class="ui avatar image" src="../assets/plumber.png">
        <div class="content">
          <div class="header">{{item.title}}</div>
          <div class="description">{{item.desc}}</div>
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
      items: [
        {
          title: 'Przepcham rurę',
          desc: 'Profesjonalnie przepcham każdą zapchaną rurę'
        },
        {
          title: 'Wymienię zlew',
          desc: 'Profesjonalnie wymienię każdy zlew 15/h'
        }
      ]
    }
  },
  methods: {
    queryString: function () {
      return this.searchQuery.phrase
    }
  }
}
</script>
