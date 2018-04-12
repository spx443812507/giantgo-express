const i18n = require('i18n')

class BadRequestError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'BarRequestError'
    this.message = code ? i18n.__(code) : undefined
    this.code = code
    this.status = 400
  }
}

module.exports = BadRequestError
