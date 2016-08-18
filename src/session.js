
const SESSION = (function () {
  let jwt, backUrl

  function processJwt (jwtToken) {
    jwt = jwtToken
    console.log(jwt)
  }

  function logged () {
    return jwt
  }

  function reset () {
    jwt = null
  }

  function setBackUrl (backurl) {
    backUrl = backurl
  }

  function getBackUrl () {
    return backUrl
  }

  return {
    setJwt: processJwt,
    logged: logged,
    reset: reset,
    setBackUrl: setBackUrl,
    getBackUrl: getBackUrl
  }
})()

export default SESSION
