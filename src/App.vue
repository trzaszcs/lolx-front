<template>
  <div class="app">
    <p>
        <h1>Component</h1>
        <hello></hello>
    </p>
    <p>
        Router <a v-link="{ path: '/search' }">Go to Search</a>
    </p>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style lang="less">
@import '../static/style.less';
</style>