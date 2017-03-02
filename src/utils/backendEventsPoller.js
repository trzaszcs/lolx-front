import session from '../session'
import scheduler from './scheduler'
import api from '../api'

export const startPolling = () => {
  if (session.logged()) {
    scheduler.start((onResult) => {
      api.getUnreadMessages(session.getJwt(), (response) => {
        api.getUnseenRequestOrderEvents(session.getJwt(), (roEventsResponse) => {
          onResult({unreadMessages: response.count, requestOrderEvents: roEventsResponse})
        })
      })
    })
  }
}

export const registerListener = (onEvent) => {
  scheduler.registerListener(onEvent)
}

export const stopPolling = () => {
  scheduler.stop()
}
