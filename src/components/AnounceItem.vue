<template>
  <div class="item">
   <img class="ui avatar image" src="../assets/plumber.png">
   <div class="content">
      <a class="ui header" v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
        {{anounce.title}}
      </a>
   </div>
 </div>
</template>

<script>
export default {
  props: ['anounce'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
