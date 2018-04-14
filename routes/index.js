const users = require('./users')
const roles = require('./roles')
const user = require('./user')
const seminars = require('./seminars')
const forms = require('./forms')

module.exports = function RouterModule (app) {
  app.use('/v1/api/users', users)
  app.use('/v1/api/roles', roles)
  app.use('/v1/api/user', user)
  app.use('/v1/api/seminars', seminars)
  app.use('/v1/api/forms', forms)
}
