const SocialPlugin = (function () {
  return {
    facebookInit: function (d, s, id) {
      var js = d.getElementsByTagName(s)[0]
      var fjs = js
      if (d.getElementById(id)) {
        console.log('find')
        return
      }
      console.log('not find')
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7'
      fjs.parentNode.insertBefore(js, fjs)
    }
  }
})()

export default SocialPlugin
