<template>
  <div class="ui container main">
    
    <search-input></search-input>
    
    <p>
        <h3>Example Link</h3>
        Router <a v-link="{ path: '/search' }">Go to Search</a>
    </p>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'

export default {
  components: {
    SearchInput
  }
}
</script>
