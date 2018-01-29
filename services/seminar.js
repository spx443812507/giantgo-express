const Seminar = require('../models/seminar')

class SeminarService {
  create (seminarInfo) {
    return new Promise((resolve, reject) => {
      const seminar = new Seminar(seminarInfo)

      seminar.save((err, seminar) => {
        if (err) {
          reject(err)
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
