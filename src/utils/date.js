class DateFormatter {
  constructor () {
    this.oneHour = 60 * 60 * 1000
  }

  time (date) {
    const twoDigits = (value) => { return ('0' + value).slice(-2) }
    const hours = twoDigits(date.getHours())
    const minutes = twoDigits(date.getMinutes())
    return `${hours}:${minutes}`
  }

  hoursDiff (date, now) {
    const diff = now - date
    return diff / this.oneHour
  }

  isToday (date, now) {
    const hours = this.hoursDiff(date, now)
    return hours < 24 && date.getHours() <= now.getHours()
  }

  isYesterday (date, now) {
    const hours = this.hoursDiff(date, now)
    return (hours >= now.getHours()) && (hours - now.getHours() < 24)
  }

  format (date) {
    const now = new Date()

    if (this.isToday(date, now)) {
      return `dziś ${this.time(date)}`
    } else if (this.isYesterday(date, now)) {
      return `wczoraj ${this.time(date)}`
    } else {
      const days = Math.ceil(this.hoursDiff(date, now) / 24)
      return `${days} dni temu`
    }
  }

  formatToDetailed (date) {
    const now = new Date()
    const diff = now - date
    const days = diff / (this.oneHour * 24)

    if (this.isToday(date, now)) {
      return `dziś ${this.time(date)}`
    } else if (this.isYesterday(date, now)) {
      return `wczoraj ${this.time(date)}`
    } else {
      return `${days} dni temu`
    }
  }
}

export default DateFormatter
