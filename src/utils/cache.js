
class Cache {
  constructor () {
    this.cache = {}
  }

  put (key, value) {
    this.cache[key] = value
  }

  clear (key) {
    delete this.cache[key]
  }

  get (key) {
    return this.cache[key]
  }

  clearAll () {
    this.cache = {}
  }

  getAndClear (key) {
    const value = this.get(key)
    if (value) {
      this.clear(key)
    }
    return value
  }
}

export default new Cache()
