const Util = (function () {
  const currentLocation = (callback) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (res) => callback(res.coords),
        () => callback(),
        {timeout: 1000})
    } else {
      callback()
    }
  }
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

  const formatDateToDetailed = (date) => {
    const diff = new Date() - date
    const oneHour = 60 * 60 * 1000
    const hours = diff / oneHour

    if (hours < 24) {
      return `dziś ${timeStr(date)}`
    } else {
      return `${date.getDate()}.${date.getMonth() + 1} ${timeStr(date)}`
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

  const decorateGeolocation = (result) => {
    let locationParts = {}
    let title = ''
    result.address_components.forEach((component) => { locationParts[component.types[0]] = component.short_name })

    if ('locality' in locationParts) {
      title = locationParts['locality'] + ', '
    }
    /*
    if ('route' in locationParts) {
      title += locationParts['route']
    }

    if ('street_number' in locationParts) {
      title += ' ' + locationParts['street_number'] + ', '
    }

    if ('political' in locationParts) {
      title += ' ' + locationParts['political']
    }
    */
    if ('administrative_area_level_1' in locationParts) {
      title += ' ' + locationParts['administrative_area_level_1']
    }
    return title
  }

  const geolocationComponent = (geo, componentName) => {
    const results = geo.address_components.filter(component => {
      return component.types[0] === componentName
    })
    return results.length > 0 ? results[0].short_name : null
  }

  const geolocationState = (geo) => {
    return geolocationComponent(geo, 'administrative_area_level_1')
  }

  const geolocationCity = (geo) => {
    return geolocationComponent(geo, 'locality')
  }

  return {
    prettyDate: formatDate,
    prettyDateDetailed: formatDateToDetailed,
    prettyPhone: formatPhone,
    emailValid: emailValid,
    phoneValid: phoneValid,
    currentLocation: currentLocation,
    decorateGeolocation: decorateGeolocation,
    geolocationState: geolocationState,
    geolocationCity: geolocationCity
  }
})()

export default Util
