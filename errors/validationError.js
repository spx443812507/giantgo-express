const _ = require('lodash')

class ValidationError extends Error {
  constructor (code, error) {
    super(typeof error === 'undefined' ? undefined : error.message)
    this.name = 'ValidationError'
    this.message = typeof error === 'undefined' ? undefined : error.message
    this.error = {}
    this.code = code
    this.status = 400

    _.forIn(error.errors, (value, key) => {
      this.error[key] = {
        code: value.message,
        message: value.message
      }
    })
  }
}

module.exports = ValidationError
