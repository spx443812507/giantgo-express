const commands = require('./commands')
const passports = require('./passports')

module.exports = function RouterModule (app) {
  app.use('/cmd', commands)
  app.use('/passports', passports)
}
