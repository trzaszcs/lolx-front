import util from '../util'

const mapStatus = requestOrder => {
  if (requestOrder.waiting) {
    return 'Oczekujący'
  } else if (requestOrder.rejected) {
    return 'Odrzucony'
  } else if (requestOrder.accepted) {
    return 'Zaakceptowany'
  } else {
    return 'BRAK'
  }
}

const decorateRequestOrder = (requestOrder, userId) => {
  const isRequestOrderAuthor = requestOrder.authorId === userId
  const isAnounceAuthor = requestOrder.anounceAuthorId === userId
  requestOrder.waiting = requestOrder.status === 'WAITING'
  requestOrder.rejected = requestOrder.status === 'REJECTED'
  requestOrder.accepted = requestOrder.status === 'ACCEPTED'
  requestOrder.creationDatePretty = util.prettyDateDetailed(new Date(requestOrder.creationDate))
  requestOrder.authorNamePretty = isRequestOrderAuthor ? `Ty (${requestOrder.authorName})` : requestOrder.authorName
  requestOrder.statusPretty = mapStatus(requestOrder)
  requestOrder.deleteAllowed = isRequestOrderAuthor && requestOrder.waiting
  requestOrder.rejectAllowed = isAnounceAuthor && (requestOrder.waiting || requestOrder.accepted)
  requestOrder.acceptAllowed = isAnounceAuthor && (requestOrder.waiting || requestOrder.rejected)
  return requestOrder
}

export {decorateRequestOrder}
