const SeminarService = require('../services/seminar')

class SeminarController {
  constructor () {
    this.seminarService = new SeminarService()
  }

  async create (req, res, next) {
    try {
      const seminarInfo = req.body
      const seminar = await this.seminarService.create(seminarInfo)
      return res.status(201).json(seminar)
    } catch (e) {
      next(e)
    }
  }

  update () {}

  get () {}

  all () {}

  remove () {}
}

module.exports = SeminarController
