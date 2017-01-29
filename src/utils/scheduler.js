class Scheduler {
  constructor () {
    this.oneHour = 60 * 60 * 1000
  }

  start (repeatableFunc) {
    this.intervalId = window.setInterval(
      () => {
        repeatableFunc((result) => {
          this.lastResult = result
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
    if (this.lastResult) {
      this.onEvent(this.lastResult)
    }
  }

}

const instance = new Scheduler()

export default instance
