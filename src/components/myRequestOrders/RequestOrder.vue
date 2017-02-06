<template>

  <div v-on:click="details()">
    <a v-if="!requestOrder.seen" class="ui horizontal label">{{label()}}</a>
    <a>{{requestOrder.anounceTitle}}</a>
    <br/>
    Zamówienie od <span class="author">{{requestOrder.authorName}}</span> <span class="creationDate">{{requestOrder.creationDatePretty}}</span> <br/>
    Status: <span class="status">{{requestOrder.statusPretty}}</span>
  </div>

</template>
<script>
export default {
  props: ['requestOrder'],
  methods: {
    details: function () {
      this.$router.go({path: '/order', query: {orderId: this.requestOrder.id}})
    },
    label: function () {
      if (!this.requestOrder.seen) {
        if (this.requestOrder.waiting) {
          return 'Nowe'
        } else {
          return 'Nowy status'
        }
      }
      return null
    }
  }
}
</script>