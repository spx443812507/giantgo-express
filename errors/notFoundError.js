const i18n = require('i18n')

class NotFoundError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'NotFoundError'
    this.message = code ? i18n.__(code) : undefined
    this.code = code
    this.status = 404
  }
}

module.exports = NotFoundError
