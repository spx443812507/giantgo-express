const errors = require('../errors')
const Form = require('../models/Form')

class FormService {
  create (formInfo) {
    return new Promise((resolve, reject) => {
      const form = new Form(formInfo)

      form.save((err, form) => {
        if (err) {
          return reject(new errors[err.name](err))
        }

        resolve(form)
      })
    })
  }
  update (formId, formInfo) {

  }
  get () {}
  all () {}
  remove () {}
}

module.exports = FormService
