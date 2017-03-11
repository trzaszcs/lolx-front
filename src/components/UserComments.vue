<template>
          
 <div class="ui fluid selection list" v-for="comment in comments">
    <div class="ui item">
      <div class="left floated content">
        <div class="ui mini star rating" data-max-rating="5" data-rating="comment.stars" id="rating"></div>
      </div>
      <div class="content">
          <a class="header">
            {{comment.nick}} 
          </a>
      </div> 
      <div class="meta">
           {{comment.msg}}
      </div> 
    </div>
 </div>

</template>
<script>
export default {
  data () {
    return {
      comments: []
    }
  },
  methods: {
  },
  ready: function () {
  },
  events: {
    'loadComments': function (comments) {
      this.comments = comments
    }
  }
}
</script>
