const Seminar = require('../models/seminar')

class SeminarService {
  async create (seminarInfo) {
    try {
      const seminar = new Seminar(seminarInfo)
      return await seminar.save()
    } catch (e) {
      throw e
    }
  }

  update (seminarId, seminarInfo) {

  }

  get () {}

  all () {}

  remove () {}
}

module.exports = SeminarService
