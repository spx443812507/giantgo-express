class UnauthorizedError extends Error {
  constructor (code) {
    super(code)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = code
    this.status = 401
  }
}

module.exports = UnauthorizedError
