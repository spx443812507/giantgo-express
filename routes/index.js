const seminars = require('./seminars')
const forms = require('./forms')
const users = require('./users')
const user = require('./user')

module.exports = function RouterModule (app) {
  app.use('/v1/api/seminars', seminars)
  app.use('/v1/api/forms', forms)
  app.use('/v1/api/users', users)
  app.use('/v1/api/user', user)
}
