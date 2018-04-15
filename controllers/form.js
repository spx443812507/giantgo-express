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

  async all (req, res, next) {
    try {
      const query = req.query
      let condition = {}
      let forms = await this.formService.all(condition, query.page, query.limit, query.sort, query.order)
      return res.status(200).json(forms)
    } catch (e) {
      next(e)
    }
  }

  remove () {}
}

module.exports = FormController
