import DateFormatter from './utils/date'

const Util = (function () {
  const dateFormatter = new DateFormatter()

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

  const parseIso = (isoStr) => {
    const parts = isoStr.match(/\d+/g)
    const isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])
    return new Date(isoTime)
  }

  const formatDate = (dateStr) => {
    return dateFormatter.format(parseIso(dateStr))
  }

  const formatDateToDetailed = (dateStr) => {
    return dateFormatter.formatToDetailed(parseIso(dateStr))
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

  const focusOnElement = (elementId) => {
    const position = document.getElementById(elementId).getBoundingClientRect()
    window.scrollTo(position.left, position.top)
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
    geolocationCity: geolocationCity,
    focusOnElement: focusOnElement
  }
})()

export default Util
