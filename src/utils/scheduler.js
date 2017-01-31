import session from '../session'

class Scheduler {
  constructor () {
    this.oneHour = 60 * 60 * 1000
  }

  start (repeatableFunc) {
    this.intervalId = window.setInterval(
      () => {
        repeatableFunc((result) => {
          session.events(result)
          if (this.onEvent) {
            this.onEvent(result)
          }
        })
      },
      30000)
  }

  stop () {
    window.clearInterval(this.intervalId)
  }

  registerListener (onEvent) {
    this.onEvent = onEvent
    const lastResult = session.events()
    if (lastResult) {
      this.onEvent(lastResult)
    }
  }

}

const instance = new Scheduler()

export default instance
