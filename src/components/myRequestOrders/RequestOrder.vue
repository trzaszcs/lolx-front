<template>

  <div>
    <a target="_blank">{{requestOrder.anounceTitle}}</a> <br/>
    <span class="author">{{requestOrder.authorNamePretty}}</span> zamówił <span class="creationDate">{{requestOrder.creationDatePretty}}</span> <br/>
    Status: <span class="status">{{requestOrder.statusPretty}}</span>
    <br/>
    <a v-if="requestOrder.deleteAllowed" v-on:click="deleteRequestOrder()">Usuń</a>
    <a v-if="requestOrder.rejectAllowed" v-on:click="reject()">Odrzuć</a>
    <a v-if="requestOrder.acceptAllowed" v-on:click="accept()">Zaakceptuj</a>
  </div>
            
</template>
<script>
export default {
  props: ['requestOrder'],
  methods: {
    deleteRequestOrder: function () {
      if (window.confirm('Czy na pewno chcesz usunąć zamówienie?')) {
        this.$dispatch('delete', {id: this.requestOrder.id})
      }
    },
    reject: function () {
      if (window.confirm('Czy na pewno chcesz odrzucić zamówienie?')) {
        this.$dispatch('reject', {id: this.requestOrder.id})
      }
    },
    confirm: function () {
      if (window.confirm('Czy na pewno chcesz potwierdzić zamówienie?')) {
        this.$dispatch('accept', {id: this.requestOrder.id})
      }
    }
  }
}
</script>