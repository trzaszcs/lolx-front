import * as $ from 'jquery'

const API = (function () {
  function headers (jwt) {
    let headers = {}
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`
    }
    return headers
  }
  return {
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
        headers: headers(jwtToken),
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({title, description, price, state, city, 'ownerId': userId})
      }).done(callback)
    },
    order: function (order, jwtToken, callback) {
      console.log('api order -> ', order)
      $.ajax({
        url: '/api/orders',
        method: 'POST',
        headers: headers(jwtToken),
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(order)
      }).done(callback)
    },
    getOrder: function (orderId, jwtToken, callback) {
      console.log('api get order -> ', orderId)
      $.ajax({
        url: `/api/orders/${orderId}`,
        method: 'GET',
        headers: headers(jwtToken)
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
        url: '/auth-api/users',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({firstName, lastName, email, password, state, city})
      }).done(callback)
    },
    userDetails: function (userId, jwt, callback) {
      $.ajax({
        url: `/auth-api/users/${userId}`,
        method: 'GET',
        headers: headers(jwt),
        contentType: 'application/json; charset=utf-8'
      }).done(callback)
    },
    updateUserDetails: function (firstName, lastName, state, city, userId, jwt, callback) {
      $.ajax({
        url: `/auth-api/users/${userId}`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({firstName, lastName, state, city})
      }).done(callback)
    }
  }
})()

export default API
