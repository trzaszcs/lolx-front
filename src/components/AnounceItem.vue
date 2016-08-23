<template>
  <div class="item">
   <div class="image">
        <img src="../assets/plumber.png">
   </div>
   <div class="content">
      <a class="header" v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
        {{anounce.title}}
      </a>
      <div class="description">
        {{anounce.price}} zł
      </div>
      <div class="extra">
        {{anounce.city}} ({{anounce.state}}) <br/>
        {{anounce.creationDate}}
      </div>
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
