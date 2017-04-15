<template>
  <loading-box :show="loading"></loading-box>
  <div id="searchResult" class="searchResult listing" v-show="finished">
    <div class="result">
      <h4>
          Znaleziono {{total}} pracowników
      </h4>
      <div class="ui large middle aligned selection list" v-for="item in workers" v-on:click="showWorker(item)">
        <worker-item :worker=item></worker-item>
      </div>
    </div>
        
    <div class="pagingBox" v-if="noOfPages > 1">
      <div class="ui pagination menu">
        <a v-for="page in noOfPages" v-on:click="goToPage(page)" class="item" v-bind:class="{selected:(page == (searchQuery.page || 0))}">{{page +1}}</a>
      </div>
    </div>

  </div>
</template>

<script>
import {decorateWorkers} from '../decorator'
import api from '../../../api'
import WorkerItem from './Item.vue'
import LoadingBox from '../../LoadingBox.vue'

const itemsPerPage = 20

const scrollToTop = () => {
  document.getElementsByTagName('body')[0].scrollIntoView()
}

export default {
  components: {
    WorkerItem,
    LoadingBox
  },
  data () {
    return {
      workers: [],
      searchQuery: {},
      loading: false,
      finished: false,
      total: 0,
      noOfPages: 0
    }
  },
  methods: {
    queryString: function () {
      return this.searchQuery.phrase
    },
    doSearch: function () {
      api.findWorkers(this.searchQuery.phrase, this.searchQuery.type, this.searchQuery.page, this.searchQuery.location, this.searchQuery.categoryId, itemsPerPage, (searchResult) => {
        this.searchFinished(searchResult)
      })
    },
    searchFinished: function (searchResult) {
      this.loading = false
      this.finished = true
      this.workers = decorateWorkers(searchResult.workers)
      this.noOfPages = searchResult.totalCount / itemsPerPage
      this.total = searchResult.totalCount
      scrollToTop()
    },
    startSearch: function () {
      this.finished = false
      this.loading = true
      this.noOfPages = 0
      this.total = 0
      this.doSearch()
    },
    goToPage: function (page) {
      this.$dispatch('listing-page-changed', {page})
    },
    showWorker: function (selectedItem) {
      this.$router.go({'path': '/worker', 'query': { id: selectedItem.id }})
    }
  },
  events: {
    'initializeSearch': function (queryMsg) {
      this.searchQuery = queryMsg
      this.startSearch()
    }
  }
}
</script>
