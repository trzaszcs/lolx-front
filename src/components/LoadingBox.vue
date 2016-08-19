<template>
  <div v-if="show" class="loadingBox">
    <div class="logo">
    </div>
  </div>
</template>
<script>
export default {
  props: ['show']
}
</script>
