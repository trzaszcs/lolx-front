<template>
  <div class="ui container">
    <div class="ui segment">
      <div class="ui card">
        
        <div class="content">
          <div class="ui header">
            Dane do zamówienia usługi
          </div>
          <div class="meta">
            kto / gdzie / kiedy
          </div>
          <div class="description">
            opis
          </div>
        </div>
        
        <div class="extra content">
          <div class="ui header">Email</div>
        </div>
      
        <div class="extra content">
          <a v-link="{ path: '/anounce', query: { anounceId: anounceId }}">link bezpośrednio do oferty</a>
        </div>
      
       <div class="extra content">
          #id: {{anounceId}}
       </div>
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
      anounceId: ''
    }
  },
  methods: {
  },
  ready: function () {
    const anounceId = this.$route.query.anounceId
    console.log(anounceId)
    this.anounceId = anounceId
  }
}
</script>
