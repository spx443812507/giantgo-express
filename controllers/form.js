const FormService = require('../services/form')

class FormController {
  constructor () {
    this.formService = new FormService()
  }

  create (req, res, next) {
    const formInfo = req.body

    this.formService.create(formInfo).then(form => {
      return res.status(201).json(form)
    }).catch(error => {
      next(error)
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = FormController
