<template>
  <div class="ui fluid card">

    <div class="ui top attached label">
      <i class="ui edit icon"></i>
      Dane Pracownika
    </div>
         
    <div class="content">

      <div class="ui container register">
        
          <loading-box :show="loading"></loading-box>

          <div v-if="!worker.id && !wantToCreateWorker">
            <a v-on:click="createAccount">Załóż konto pracownika</a>
          </div>

          <div v-if="worker.id || wantToCreateWorker">
            <info-box :visible="saved" :message="'Dane pracownika zostały zapisane'"></info-box>
            <a v-if="worker.id" v-on:click="deleteAccount">Usuń konto pracownika</a>
            <plain-form :worker="worker"></plain-form>
          </div>

     </div>

    </div>
  </div>

</template>

<script>
import api from '../../api'
import session from '../../session'
import LoadingBox from '../LoadingBox.vue'
import InfoBox from '../InfoBox.vue'
import PlainForm from './PlainForm.vue'

const buildWorker = (id, description, categories) => {
  return {id, description, categories}
}

const emptyWorker = () => {
  return buildWorker(null, '', [])
}

export default {
  props: ['new'],
  components: {
    LoadingBox,
    InfoBox,
    PlainForm
  },
  data () {
    return {
      worker: emptyWorker(),
      loading: false,
      saved: false,
      wantToCreateWorker: null
    }
  },
  methods: {
    afterSave: function () {
      this.saved = true
      this.loading = false
    },
    saveWorker: function () {
      this.loading = true
      const userId = session.getUserId()
      const jwt = session.getJwt()
      if (this.worker.id) {
        api.updateWorker(this.worker.id, userId, this.worker.description, this.worker.categories, jwt, (response) => {
          this.afterSave()
        })
      } else {
        api.createWorker(userId, this.worker.description, this.worker.categories, jwt, (response) => {
          this.worker.id = response.id
          this.afterSave()
        })
      }
    },
    createAccount () {
      this.wantToCreateWorker = true
    },
    deleteAccount () {
      if (window.confirm('Czy na pewno chcesz usunąć konto pracownika?')) {
        this.loading = true
        api.deleteWorker(this.worker.id, session.getUserId(), session.getJwt(), () => {
          this.worker = emptyWorker()
          this.wantToCreateWorker = false
          this.loading = false
        })
      }
    }
  },
  ready: function () {
    if (!session.logged()) {
      this.$router.go({ path: '/login' })
      return
    }
    this.loading = true
    api.getWorkerForUser(session.getUserId(), session.getJwt(), (response) => {
      if (response.found) {
        this.worker = buildWorker(response.id, response.description, response.categoryIds)
      } else {
        this.worker = emptyWorker()
      }
      this.loading = false
    })
  },
  events: {
    'workerSavedEvent': function (event) {
      console.log('worker saved', event)
      this.worker = event.worker
      this.saveWorker()
    }
  }
}
</script>
