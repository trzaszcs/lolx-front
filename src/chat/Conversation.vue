<template>
  <div class="ui container conversation">
    <div class="ui segment">
    
      <ul>
        <li v-for="msg in messages">
          <message :msg="msg"></message>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  props: ['messages'],
  components: {
    Message
  }
}
</script>
