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
    search: function (query, type, page, location, categoryId, itemsPerPage, callback) {
      let queryData = {'query': query, 'page': page, 'itemsPerPage': itemsPerPage, type}
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
    add: function (title, description, price, location, contactPhone, imgName, categoryId, type, duration, userId, jwtToken, callback) {
      $.ajax({
        url: '/api/anounces',
        method: 'POST',
        headers: headers(jwtToken),
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({title, description, price, location, contactPhone, imgName, categoryId, type, duration, 'ownerId': userId})
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
      console.log('api get customer orders -> ', userId)
      $.ajax({
        url: `/api/orders/customer/${userId}`,
        method: 'GET',
        headers: headers(jwtToken)
      }).done(callback)
    },
    getOwnerOrders: function (userId, jwtToken, callback) {
      console.log('api get owner orders -> ', userId)
      $.ajax({
        url: `/api/orders/owner/${userId}`,
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
    register: function (firstName, lastName, nick, email, phone, password, location, callback) {
      $.ajax({
        url: '/auth-api/users',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({firstName, lastName, nick, email, phone, password, location})
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
    reverseGeocode: function (latitude, longitude, callback) {
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`,
        method: 'GET'
      }).done(callback)
    },
    categories: function (callback) {
      $.ajax({
        url: '/category-api/categories',
        method: 'GET'
      }).done(callback)
    },
    createChat: function (anounceId, opponent, jwt, msg, callback) {
      $.ajax({
        url: '/chat-api/chat',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({anounceId, msg, opponent})
      }).done(callback)
    },
    appendMessage: function (chatId, jwt, msg, callback) {
      $.ajax({
        url: `/chat-api/chat/${chatId}`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({msg})
      }).done(callback)
    },
    getChat: function (chatId, jwt, callback) {
      $.ajax({
        url: `/chat-api/chat/${chatId}`,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback)
    },
    getChatStatus: function (anounceId, opponent, jwt, callback) {
      $.ajax({
        url: `/chat-api/chat/status?anounceId=${anounceId}&opponent=${opponent}`,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    getChatForAnounce: function (anounceId, opponent, jwt, callback) {
      $.ajax({
        url: `/chat-api/chat?anounceId=${anounceId}&opponent=${opponent}`,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    getUserChats: function (page, itemsPerPage, jwt, callback) {
      let query = {page, itemsPerPage}
      $.ajax({
        url: '/chat-api/chat/user',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: query
      }).done(callback)
    },
    getUnreadMessages: function (jwt, callback) {
      $.ajax({
        url: '/chat-api/chat/unread',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback)
    },
    requestOrder: function (anounceId, jwt, callback) {
      $.ajax({
        url: '/api/request-orders/',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({anounceId})
      }).done(callback).fail(result => {
        callback()
      })
    },
    removeRequestOrder: function (requestOrderId, jwt, callback) {
      $.ajax({
        url: `/api/request-orders/${requestOrderId}`,
        method: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    acceptRequestOrder: function (requestOrderId, jwt, callback) {
      $.ajax({
        url: `/api/request-orders/${requestOrderId}/accept`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    rejectRequestOrder: function (requestOrderId, jwt, callback) {
      $.ajax({
        url: `/api/request-orders/${requestOrderId}/reject`,
        method: 'PUT',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    getRequestOrder: function (id, jwt, callback) {
      $.ajax({
        url: `/api/request-orders/${id}`,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    getUnseenRequestOrderEvents: function (jwt, callback) {
      $.ajax({
        url: '/api/request-orders/events/unseen',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    getRequestOrderForAnounce: function (anounceId, jwt, callback) {
      $.ajax({
        url: `/api/request-orders/anounce/${anounceId}`,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback).fail(result => {
        callback()
      })
    },
    getRequestOrdersForAuthor: function (anounceId, jwt, callback) {
      $.ajax({
        url: '/api/request-orders/author',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback)
    },
    getRequestOrdersForAnounceAuthor: function (jwt, callback) {
      $.ajax({
        url: '/api/request-orders/anounce-author',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback)
    },
    getRequestOrdersForUser: function (page, itemsPerPage, status, jwt, callback) {
      let query = {status, page, itemsPerPage}
      $.ajax({
        url: '/api/request-orders/user',
        method: 'GET',
        data: query,
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback)
    },
    getUserRating: function (userId, jwt, callback) {
      $.ajax({
        url: `/rating-api/ratings/${userId}`,
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt)
      }).done(callback)
    },
    updateUserStarRating: function (userId, announceId, starRating, comment, jwt, callback) {
      $.ajax({
        url: '/rating-api/ratings',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({
          'userId': userId,
          'rate': starRating,
          'type': 'STAR',
          'announceId': announceId,
          'comment': comment
        })
      }).done(callback)
    },
    updateUserLikesRating: function (userId, announceId, comment, jwt, callback) {
      $.ajax({
        url: '/rating-api/ratings',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: headers(jwt),
        data: JSON.stringify({
          'userId': userId,
          'rate': 1,
          'type': 'LIKE',
          'announceId': announceId,
          'comment': comment
        })
      }).done(callback)
    }
  }
})()

export default API
