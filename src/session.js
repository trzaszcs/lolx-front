
const SESSION = (function () {
  let jwt, backUrl, userId

  function create (responseUserId, jwtToken) {
    jwt = jwtToken
    userId = responseUserId
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

  function getJwt () {
    return jwt
  }

  function getUserId () {
    return userId
  }

  return {
    create: create,
    logged: logged,
    reset: reset,
    setBackUrl: setBackUrl,
    getBackUrl: getBackUrl,
    getJwt: getJwt,
    getUserId: getUserId
  }
})()

export default SESSION
