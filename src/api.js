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
    search: function (query, page = 0, callback) {
      $.ajax({
        url: '/api/announces/find',
        data: {'query': query, 'page': page}
      }).done(callback)
    }
  }
})()

export default API
