const SocialPlugin = (function () {
  function buildFacebookLoginAddress () {
    const appId = '1069849489717317'
    const redirectUrl = encodeURIComponent('http://lolx-front.herokuapp.com/#!/fb')
    const version = 2.7
    const scope = 'email,public_profile'
    return `https://www.facebook.com/v${version}/dialog/oauth?client_id=${appId}&response_type=code&sdk=jssdk&redirect_uri=${redirectUrl}&scope=${scope}`
  }

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
    },
    fbLoginUrl: buildFacebookLoginAddress
  }
})()

export default SocialPlugin
