<template>
  <div class="conversation">
      <ul>
        <li v-for="msg in messages">
          <message :msg="msg"></message>
        </li>
      </ul>
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
