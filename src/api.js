import * as $ from 'jquery'

const API = (function () {
  return {
    doCall: function (succCallback) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users'
      }).done(succCallback)
    }
  }
})()

export default API
