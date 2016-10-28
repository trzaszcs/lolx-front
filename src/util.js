const Util = (function () {
  const timeStr = (date) => {
    const twoDigits = (value) => { return ('0' + value).slice(-2) }
    const hours = twoDigits(date.getHours())
    const minutes = twoDigits(date.getMinutes())
    return `${hours}:${minutes}`
  }
  const formatDate = (anounceDate) => {
    const diff = new Date() - anounceDate
    const oneHour = 60 * 60 * 1000
    const hours = diff / oneHour
    const days = hours / 24

    if (hours < 24) {
      return `dziś ${timeStr(anounceDate)}`
    } else if (hours < 48) {
      return `wczoraj ${timeStr(anounceDate)}`
    } else {
      return `${days} dni temu`
    }
  }

  const emailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  return {
    prettyDate: formatDate,
    emailValid: emailValid
  }
})()

export default Util
