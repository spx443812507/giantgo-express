class BadRequestError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'BarRequestError'
    this.message = typeof error === 'undefined' ? undefined : error.message
    this.code = code
    this.status = 400
  }
}

module.exports = BadRequestError
