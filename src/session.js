
const SESSION = (function () {
  let backUrl
  let userEvents = {requestOrderEvents: []}

  function logout () {
    window.localStorage.removeItem('login.jwt')
    window.localStorage.removeItem('login.userId')
  }

  function create (responseUserId, jwtToken) {
    window.localStorage.setItem('login.jwt', jwtToken)
    window.localStorage.setItem('login.userId', responseUserId)
  }

  function logged () {
    return getJwt()
  }

  function setBackUrl (backurl) {
    backUrl = backurl
  }

  function getBackUrl () {
    return backUrl
  }

  function getJwt () {
    return window.localStorage.getItem('login.jwt')
  }

  function getUserId () {
    return window.localStorage.getItem('login.userId')
  }

  function events (eventsList) {
    if (eventsList !== undefined) {
      userEvents = eventsList
    }
    return userEvents
  }

  return {
    create: create,
    logged: logged,
    setBackUrl: setBackUrl,
    getBackUrl: getBackUrl,
    getJwt: getJwt,
    getUserId: getUserId,
    logout: logout,
    events: events
  }
})()

export default SESSION
