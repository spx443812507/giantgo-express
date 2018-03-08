class UnauthorizeError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'UnauthorizedError'
    this.message = error.message
    this.code = code
    this.status = 401
  }
}

module.exports = UnauthorizeError
