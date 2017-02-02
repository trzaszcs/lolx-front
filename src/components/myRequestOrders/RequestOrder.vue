<template>

  <div v-on:click="details()">
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
    }
  }
}
</script>