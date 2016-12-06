
class Cache {
  constructor () {
    this.cache = {}
  }

  put (key, value) {
    this.cache[key] = value
  }

  clear (key) {
    this.cache.delete(key)
  }

  get (key) {
    return this.cache[key]
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
