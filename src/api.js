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
    search: function (query, page, location, categoryId, itemsPerPage, callback) {
      let queryData = {'query': query, 'page': page, 'itemsPerPage': itemsPerPage}
      if (location) {
        queryData.location = queryData.title
        queryData.latitude = queryData.latitude
        queryData.longitude = queryData.longitude
      }
      if (categoryId) {
        queryData.categoryId = categoryId
      }
      $.ajax({
        url: '/api/anounces',
        data: queryData
      }).done(callback)
    },
    add: function (title, description, price, location, imgName, categoryId, type, duration, userId, jwtToken, callback) {
      $.ajax({
        url: '/api/anounces',
        method: 'POST',
        headers: headers(jwtToken),
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({title, description, price, location, imgName, categoryId, type, duration, 'ownerId': userId})
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
    getCustomerOrders: function (userId, jwtToken, callback) {
      console.log('api get order -> ', userId)
      $.ajax({
        url: `/api/orders/customer/${userId}`,
        method: 'GET',
        headers: headers(jwtToken)
      }).done(callback)
    },
    sendOrderEmail: function (orderEmail, jwtToken, callback) {
      console.log('api email order -> ', orderEmail)
      $.ajax({
        url: '/api/orders/email',
        method: 'POST',
        headers: headers(jwtToken),
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(orderEmail)
      }).done((result) => {
        callback({success: true})
      }).fail((result) => {
        callback({success: false})
      })
    },
    closeAnounce: function (anounceId, jwtToken, callback) {
      $.ajax({
        url: `/api/anounces/${anounceId}`,
        method: 'DELETE',
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
    register: function (firstName, lastName, email, phone, password, location, callback) {
      $.ajax({
        url: '/auth-api/users',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({firstName, lastName, email, phone, password, location})
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
    updateUserDetails: function (email, phone, firstName, lastName, location, userId, jwt, callback) {
      $.ajax({
        url: `/auth-api/users/${userId}`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({email, phone, firstName, lastName, location})
      }).done(callback)
    },
    changePassword: function (oldPassword, newPassword, userId, jwt, callback) {
      $.ajax({
        url: `/auth-api/users/${userId}/change-password`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({oldPassword, newPassword})
      }).done(result => {
        callback({success: true})
      }).fail(result => {
        if (result.status === 409) {
          callback({success: false, wrongOldPassword: true})
        } else {
          callback({success: false})
        }
      })
    },
    resetPassword: function (email, callback) {
      $.ajax({
        url: '/auth-api/users/reset-password',
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({email})
      }).done(result => {
        callback({success: true})
      }).fail(result => {
        callback({success: false})
      })
    },
    changePasswordAfterReset: function (resetRefId, password, callback) {
      $.ajax({
        url: `/auth-api/users/reset-password/${resetRefId}/change-password`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({password})
      }).done(result => {
        callback({success: true})
      }).fail(result => {
        callback({success: false})
      })
    },
    geocode: function (address, callback) {
      $.ajax({
        url: `https://maps.google.com/maps/api/geocode/json?components=country:PL&language=pl&address=${address}`,
        method: 'GET'
      }).done(callback)
    },
    categories: function (callback) {
      $.ajax({
        url: '/category-api/categories',
        method: 'GET'
      }).done(callback)
    }
  }
})()

export default API
