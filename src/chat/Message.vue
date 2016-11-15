<template>
  <div class="message" v-bind:class="{'left': msg.leftSide}">
    {{msg.msg}}</br>
    autor: {{msg.author}} </br>
    utworzono {{msg.created}}
  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
