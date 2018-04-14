const {NotFoundError} = require('../errors')
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
    let form

    try {
      form = await this.get(formId)
      form = await form.update(formInfo)
    } catch (e) {
      throw e
    }

    return form
  }

  async get (formId) {
    let form
    try {
      form = await Form.findById(formId)
    } catch (e) {
      throw e
    }

    if (!form) {
      throw new NotFoundError('form_not_exists')
    }

    return form
  }

  all () {}

  remove () {}
}

module.exports = FormService
