<template>
  <loading-box :show="loading"></loading-box>
  <div class="content">
    <div class="ui fluid selection list" v-for="item in anounces">
      <div class="ui item">

        <div class="left floated content">
          <img class="ui tiny image" src="http://semantic-ui.com/images/wireframe/image.png">
        </div>

        <div class="content">
          <a class="header" v-link="{ path: '/anounce', query: { anounceId: item.id }}">
            {{item.title}} 
          </a>
          <div class="description" v-on:click="showAnounce(item)">
            Cena {{item.price}} zł 
          </div>
        </div>  
                           
        <button class="ui right floated teal button" v-if="forCurrentUser" v-on:click="deleteAnounce(item)">
          usuń
        </button>
            
      </div>
    </div>
  </div> 
  
</template>

<script>
  import session from '../session'
  import LoadingBox from './LoadingBox'
  import api from '../api'
  
  export default {
    props: ['userId'],
    components: {LoadingBox},
    data () {
      return {
        loading: false,
        forCurrentUser: false,
        anounces: []
      }
    },
    methods: {
      showAnounce: function (selectedItem) {
        console.log('MyAccount - showAnounce' + selectedItem)
        this.$router.go({'path': '/anounce', 'query': { anounceId: selectedItem.id }})
      },
      deleteAnounce: function (selectedItem) {
        api.deleteAnounce(selectedItem.id, session.getJwt(), (result) => {
          this.$router.go({path: '/myAccount'})
        })
      }
    },
    ready: function () {
      this.forCurrentUser = session.getUserId() === this.userId
      this.loading = false
      api.getForUser(this.userId, 0, 10, (anounces) => {
        this.anounces = anounces.anounces
        this.loading = false
      })
      this.loading = true
    }
  }
</script>