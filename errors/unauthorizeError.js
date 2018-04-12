const i18n = require('i18n')

class UnauthorizeError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'UnauthorizedError'
    this.message = code ? i18n.__(code) : undefined
    this.code = code
    this.status = 401
  }
}

module.exports = UnauthorizeError
