const Form = require('../models/form')

class FormService {
  async create (formInfo) {
    try {
      const form = new Form(formInfo)
      return await form.save()
    } catch (e) {
      throw e
    }
  }

  async update (formId, formInfo) {

  }

  async get (formId) {
    try {
      return await Form.findOne({
        _id: formId
      })
    } catch (e) {
      throw e
    }
  }

  all () {}

  remove () {}
}

module.exports = FormService
