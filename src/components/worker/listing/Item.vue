<template>
  <div class="item">

    <div class="ui stackable grid">  
      <div class="row">
        <div class="column">
          <h3 class="ui header">
            <a v-link="{ path: '/worker', query: { id: worker.id }}">
              {{worker.name}}
            </a>
          </h3>
        </div>
      </div>
      
      <div class="four wide column">
        <img class="ui small image" :src="worker.img">
      </div>

      <div class="ten wide column">
        <h4 class="ui header">{{worker.location.title}}</h4>
        <div class="content">
          <span class="category">{{worker.categoriesPretty}}</span>
        </div>
      </div>

    </div>
 
   </div>
</template>

<script>
export default {
  props: ['worker'],
  data () {
    return {
    }
  }
}
</script>
