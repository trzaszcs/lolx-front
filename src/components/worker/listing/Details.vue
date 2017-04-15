<template>
  <loading-box :show="loading"></loading-box>
  <div class="ui container workerDetails">
  
    <div class="ui fluid card">
      <div class="ui top attached label">        
        <a v-on:click="back()" class="ui icon" data-tooltip="wróć na poprzednią stronę">
          <i class="ui left arrow icon"></i>
          wstecz
        </a>
      </div>
      
      <div class="ui left aligned content">
        <div class="ui description">
            <div class="ui header">
              {{worker.name}}
            </div>
        </div>

        <div class="meta">
          {{worker.location.title}}
        </div>

        <div class="categories">
          <h5>Specjalizacje:</h5>
          <ul>
            <li v-for="cat in worker.categoriesList">{{cat.name}}</li>
          </ul>
        </div>

        <br/>

        <div class="ui content">
          <img class="ui left floated small spaced image" :src="worker.img">
          {{worker.description}}
        </div>

      </div>

    </div>
    
  </div>

</template>

<script>
import {decorateWorker} from '../decorator'
import api from '../../../api'
import LoadingBox from '../../LoadingBox.vue'

export default {
  components: {
    LoadingBox
  },
  data () {
    return {
      worker: {
        id: null,
        img: '',
        description: '',
        location: {}
      },
      loading: false
    }
  },
  methods: {
    back: function () {
      window.history.back()
    }
  },
  ready: function () {
    this.loading = true
    api.getWorker(this.$route.query.id, (worker) => {
      this.worker = decorateWorker(worker)
      this.loading = false
    })
  }
}
</script>
