import * as $ from 'jquery'

const API = (function () {
  const userId = 'anonymous'
  return {
    doCall: function (succCallback) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users'
      }).done(succCallback)
    },
    doCallRelative: function (succCallback) {
      $.ajax({
        url: '/api/users'
      }).done(succCallback)
    },
    search: function (query, page, itemsPerPage, callback) {
      $.ajax({
        url: '/api/anounces',
        data: {'query': query, 'page': page, 'itemsPerPage': itemsPerPage}
      }).done(callback)
    },
    add: function (title, description, state, city, callback) {
      $.ajax({
        url: '/api/anounces',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({title, description, state, city, 'ownerId': userId})
      }).done(callback)
    },
    getForUser: function (page, itemsPerPage, callback) {
      $.ajax({
        url: '/api/anounces/user',
        data: {'ownerId': userId}
      }).done(callback)
    }
  }
})()

export default API
