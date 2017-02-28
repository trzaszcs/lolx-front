
export default (queryMap) => {
  let query = {}
  if ('phrase' in queryMap) {
    query.phrase = queryMap.phrase
  }
  if ('page' in queryMap) {
    const page = queryMap.page
    if (!isNaN(page)) {
      query.page = page
    }
  }
  if ('location' in queryMap &&
      'lat' in queryMap &&
      'lng' in queryMap) {
    const title = queryMap.location
    const lat = queryMap.lat
    const lng = queryMap.lng
    if (title && lat && lng) {
      query.location = {title: title, latitude: lat, longitude: lng}
    }
  }

  if ('category' in queryMap) {
    query.categoryId = queryMap.category
  }
  if ('anounceType' in queryMap) {
    const anounceType = queryMap.anounceType
    if (anounceType && (anounceType === 'ORDER' || anounceType === 'ORDER')) {
      query.anounceType = anounceType
    }
  }
  return query
}
