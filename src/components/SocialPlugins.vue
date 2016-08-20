<template>
  <div class="socialPlugins ui bottom attached segment">
    <div id="fb-root"></div>
    <div class="fb-like" v-bind:data-href="siteUrl" data-layout="standard" data-action="recommend" data-show-faces="true" data-share="true"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      siteUrl: ''
    }
  },
  methods: {
    facebookInit: function (d, s, id) {
      var js = d.getElementsByTagName(s)[0]
      var fjs = js
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7'
      fjs.parentNode.insertBefore(js, fjs)
    }
  },
  ready: function () {
    this.facebookInit(document, 'script', 'facebook-jssdk')
    this.siteUrl = document.location.href
    console.log(this.siteUrl)
  }
}
</script>
