const FormService = require('../services/form')

class FormController {
  constructor () {
    this.formService = new FormService()
  }

  async create (req, res, next) {
    try {
      const formInfo = req.body
      const form = await this.formService.create(formInfo)
      return res.status(201).json(form)
    } catch (e) {
      next(e)
    }
  }

  async update (req, res, next) {
    try {
      const formInfo = req.body
      const formId = req.params.form_id
      const form = await this.formService.update(formId, formInfo)
      return res.status(200).json(form)
    } catch (e) {
      next(e)
    }
  }

  async get (req, res, next) {
    try {
      const formId = req.params.form_id
      const form = await this.formService.get(formId)
      return res.status(200).json(form)
    } catch (e) {
      next(e)
    }
  }

  all () {}

  remove () {}
}

module.exports = FormController
