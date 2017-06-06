<template>
  <div class="item">
    <img class="ui small image" :src="anounce.img" style="float:left">
    <div class="content">
      <h3 class="title">
          <a v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
              {{anounce.title}}
          </a>
      </h3>
      <span class="category">{{anounce.categoryName}}</span>
      <div class="price">
          {{anounce.price}} zł
      </div>
      <div class="location">{{anounce.location.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['anounce'],
  data () {
    return {
    }
  }
}
</script>
