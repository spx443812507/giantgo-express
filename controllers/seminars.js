const SeminarService = require('../services/seminar')

class SeminarController {
  constructor () {
    this.seminarService = new SeminarService()
  }

  create (req, res) {
    const seminarInfo = req.body

    this.seminarService.create(seminarInfo).then(seminar => {
      res.status(201).json(seminar)
    }).catch(error => {
      res.status(400).json({
        error: error.errors,
        message: error.message
      })
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = SeminarController
