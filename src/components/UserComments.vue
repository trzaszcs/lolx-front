<template>
          
 <div class="ui fluid selection list" v-for="comment in comments">
    <div class="ui item">
      <div class="left floated content">
        {{comment.date}}
      </div>
      <div class="right floated content">
        <b>{{comment.nick}}</b>
        <i class="ui yellow star icon"></i>
        {{comment.stars}}/5 
      </div>
      <div class="meta">
        <p>
          {{comment.msg}}
        </p>
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
