const commands = require('./commands')

module.exports = function RouterModule (app) {
  app.use('/cmd', commands)
}
