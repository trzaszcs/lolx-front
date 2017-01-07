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

const focusOnMessage = (msgId) => {
  const element = document.getElementById(msgId)
  if (element) {
    document.getElementsByClassName('conversation')[0].scrollTop = element.offsetTop
  } else {
    console.log('element with id ' + msgId + ' not found')
  }
}

export default {
  props: ['messages', 'focusedMessageId'],
  components: {
    Message
  },
  ready: function () {
    focusOnMessage(this.focusedMessageId)
  },
  watch: {
    focusedMessageId: function (newV) {
      if (newV) {
        focusOnMessage(newV)
      }
    }
  }
}
</script>
