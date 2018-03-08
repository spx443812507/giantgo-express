const SeminarService = require('../services/seminar')

class SeminarController {
  constructor () {
    this.seminarService = new SeminarService()
  }

  create (req, res, next) {
    const seminarInfo = req.body

    this.seminarService.create(seminarInfo).then(seminar => {
      return res.status(201).json(seminar)
    }).catch(error => {
      next(error)
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = SeminarController
