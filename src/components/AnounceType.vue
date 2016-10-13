<template>
  <div class="anounceType">
    <div v-if="type === 'FIND'" class="ui green horizontal label">
      ZLECĘ
    </div>
    <div v-else class="ui teal horizontal label">
      WYKONAM
    </div>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>
