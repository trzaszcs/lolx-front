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
    },
    add: function (title, description, price, state, city, userId, jwtToken, callback) {
      $.ajax({
        url: '/api/anounces',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        },
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({title, description, price, state, city, 'ownerId': userId})
      }).done(callback)
    },
    order: function (order, jwtToken, callback) {
      console.log('api order -> ', order)
      $.ajax({
        url: '/api/orders',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        },
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(order)
      }).done(callback)
    },
    getForUser: function (userId, page, itemsPerPage, callback) {
      $.ajax({
        url: `/api/anounces/user/${userId}`,
        data: {page, itemsPerPage}
      }).done(callback)
    },
    getById: function (anounceId, callback) {
      $.ajax({
        url: `/api/anounces/${anounceId}`
      }).done(callback)
    },
    login: function (email, password, callback) {
      $.ajax({
        url: '/auth-api/auth',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({email, password})
      }).done((result) => {
        callback({success: true, jwt: result.jwt, userId: result.userId})
      }).fail((result) => {
        callback({success: false})
      })
    },
    loginWithFacebook: function (code, callback) {
      $.ajax({
        url: '/auth-api/auth-facebook',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({code})
      }).done((result) => {
        callback({success: true, jwt: result.jwt, userId: result.userId})
      }).fail((result) => {
        callback({success: false})
      })
    },
    register: function (firstName, lastName, email, password, state, city, callback) {
      $.ajax({
        url: '/auth-api/register',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({firstName, lastName, email, password, state, city})
      }).done(callback)
    }
  }
})()

export default API
