<template>

  <div v-on:click="details()">
    <a>{{requestOrder.anounceTitle}}</a> <br/>
    <span class="author">{{requestOrder.authorNamePretty}}</span> zamówił <span class="creationDate">{{requestOrder.creationDatePretty}}</span> <br/>
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