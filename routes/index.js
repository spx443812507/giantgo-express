const seminars = require('./seminars')
const forms = require('./forms')
const users = require('./users')

module.exports = function RouterModule (app) {
  app.use('/v1/api/seminars', seminars)
  app.use('/v1/api/forms', forms)
  app.use('/v1/api/users', users)
}
