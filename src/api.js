import * as $ from 'jquery'

const API = (function () {
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
    }
  }
})()

export default API
