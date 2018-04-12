const i18n = require('i18n')

class ForbiddenError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'ForbiddenError'
    this.message = code ? i18n.__(code) : undefined
    this.code = code
    this.status = 403
  }
}

module.exports = ForbiddenError
