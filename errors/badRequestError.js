class BadRequestError extends Error {
  constructor (code) {
    super(code)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = code
    this.status = 400
  }
}

module.exports = BadRequestError
