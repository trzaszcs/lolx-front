<template>
  <div class="item">
                 
    <div class="ui stackable grid">  
      <div class="row">
        <div class="column">
          <h3 class="ui header">
            <a v-link="{ path: '/anounce', query: { anounceId: anounce.id }}">
              {{anounce.title}}
            </a>
          </h3>
        </div>
      </div>
      
      <div class="four wide column">
          <img class="ui small image" :src="anounce.img">
      </div>

      <div class="ten wide column">
        <h4 class="ui header">{{anounce.location.title}}</h4>
        <div class="content">
          <span class="category">{{anounce.categoryName}}</span>
          {{creationDate()}}
        </div>
      </div>

      <div class="two wide left aligned column">
        <h4 class="ui header">Cena</h4>
        <div class="content">
          {{anounce.price}} zł
        </div>
      </div>
    </div>
 
   </div>
</template>

<script>
import util from '../../util'

export default {
  props: ['anounce'],
  data () {
    return {
      creationDate: function () {
        return util.prettyDate(this.anounce.creationDate)
      }
    }
  }
}
</script>
