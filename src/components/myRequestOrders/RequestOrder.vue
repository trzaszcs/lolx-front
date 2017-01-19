<template>

  <div v-on:click="details()">
    <anounce-type type="reqeuestOrder.anounceType"></anounce-type>
    <a>{{requestOrder.anounceTitle}}</a>
    <br/>
    Zamówienie od <span class="author">{{requestOrder.authorName}}</span> <span class="creationDate">{{requestOrder.creationDatePretty}}</span> <br/>
    Status: <span class="status">{{requestOrder.statusPretty}}</span>
  </div>

</template>
<script>
import AnounceType from '../AnounceType'

export default {
  props: ['requestOrder'],
  components: {AnounceType},
  methods: {
    details: function () {
      this.$router.go({path: '/order', query: {orderId: this.requestOrder.id}})
    }
  }
}
</script>