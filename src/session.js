
const SESSION = (function () {
  let jwt

  function processJwt (jwtToken) {
    jwt = jwtToken
    console.log('jwt-->', jwt)
  }

  function logged () {
    return false
  }

  function reset () {
    jwt = null
  }

  return {
    setJwt: processJwt,
    logged: logged,
    reset: reset
  }
})()

export default SESSION
