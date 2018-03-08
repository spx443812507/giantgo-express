class NotFoundError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'NotFoundError'
    this.message = typeof error === 'undefined' ? undefined : error.message
    this.code = typeof code === 'undefined' ? '404' : code
    this.status = 404
  }
}

module.exports = NotFoundError
