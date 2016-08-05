<template>
  <div class="ui container main">
    <h1>
        Main Page
    </h1>
    <p>
        <h3>Component Example</h3>
        <hello></hello>
    </p>
    <p>
        <h3>Example Link</h3>
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
