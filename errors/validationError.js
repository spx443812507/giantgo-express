const _ = require('lodash')
const i18n = require('i18n')

class ValidationError extends Error {
  constructor (error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'ValidationError'
    this.message = typeof error === 'undefined' ? undefined : error.message
    this.error = {}
    this.code = 'validation_error'
    this.status = 400

    _.forIn(error.errors, (value, key) => {
      this.error[key] = {
        code: value.message,
        message: i18n.__(value.message)
      }
    })
  }
}

module.exports = ValidationError
