const SeminarService = require('../services/seminar')

class SeminarController {
  constructor () {
    this.seminarService = new SeminarService()
  }

  create (req, res) {
    const seminarInfo = req.body

    this.seminarService.create(seminarInfo).then(seminar => {
      res.status(201).json(seminar)
    }).catch(err => {
      res.status(400).json({
        msg: err
      })
    })
  }
  update () {}
  get () {}
  all () {}
  remove () {}
}

module.exports = SeminarController
