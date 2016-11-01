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
    const days = Math.floor(hours / 24)

    if (hours < 24) {
      return `dziś ${timeStr(anounceDate)}`
    } else if (hours < 48) {
      return `wczoraj ${timeStr(anounceDate)}`
    } else {
      return `${days} dni temu`
    }
  }

  const formatPhone = (phone) => {
    if (phone.length === 9) {
      const re = /([0-9]{3})([0-9]{3})([0-9]{3})/
      return phone.replace(re, '$1 $2 $3')
    }
    return phone
  }

  const emailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const phoneValid = (phone) => {
    if (phone) {
      const formatted = phone.replace(/ /g, '').replace(/-/g, '')
      return formatted.match(/^[0-9]+$/) && formatted.length > 5
    }
    return false
  }

  return {
    prettyDate: formatDate,
    prettyPhone: formatPhone,
    emailValid: emailValid,
    phoneValid: phoneValid
  }
})()

export default Util
