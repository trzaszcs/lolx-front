<template>
  <div class="ui segment">

    <loading-box :show="saving"></loading-box>

    <info-box :visible="saved" :message="'Dane pracownika zostały zapisane'"></info-box>

    <plain-form :worker="worker"></plain-form>

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
      saving: false,
      saved: false
    }
  },
  methods: {
    afterSave: function () {
      this.saved = true
      this.saving = false
    },
    saveWorker: function () {
      this.saving = true
      const userId = session.getUserId()
      const jwt = session.getJwt()
      if (this.worker.id) {
        api.updateWorker(this.worker.id, userId, this.worker.description, this.worker.categories, jwt, (response) => {
          this.afterSave()
        })
      } else {
        api.createWorker(userId, this.worker.description, this.worker.categories, jwt, (response) => {
          this.woker.id = response.id
          this.afterSave()
        })
      }
    }
  },
  ready: function () {
    if (!session.logged()) {
      this.$router.go({ path: '/login' })
      return
    }
    api.getWorkerForUser(session.getUserId(), session.getJwt(), (response) => {
      if (response.found) {
        this.worker = buildWorker(response.id, response.description, response.categoryIds)
      } else {
        this.worker = emptyWorker()
      }
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
