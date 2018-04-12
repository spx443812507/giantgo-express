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

  update () {}

  get () {}

  all () {}

  remove () {}
}

module.exports = FormController
