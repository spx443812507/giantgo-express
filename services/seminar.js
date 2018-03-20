const errors = require('../errors')
const Seminar = require('../models/seminar')

class SeminarService {
  create (seminarInfo) {
    return new Promise((resolve, reject) => {
      const seminar = new Seminar(seminarInfo)

      seminar.save((err, seminar) => {
        if (err) {
          return reject(new errors[err.name](err))
        }

        resolve(seminar)
      })
    })
  }
  update (seminarId, seminarInfo) {

  }
  get () {}
  all () {}
  remove () {}
}

module.exports = SeminarService
