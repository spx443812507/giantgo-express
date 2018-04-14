const {NotFoundError} = require('../errors')
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

  async get (seminarId) {
    let seminar
    try {
      seminar = await Seminar.findById(seminarId)
    } catch (e) {
      throw e
    }

    if (!seminar) {
      throw new NotFoundError('seminar_not_exists')
    }

    return seminar
  }

  all () {}

  remove () {}
}

module.exports = SeminarService
