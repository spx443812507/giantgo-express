const CommandService = require('../services/commandService')()
const commandService = new CommandService()

module.exports = function CommandControllerModule () {
  function CommandController () {

  }

  CommandController.prototype.broadcast = function (req, res, next) {
    const command = req.body.command
    const data = req.body.data

    commandService.broadcast(command, data).then(function (data) {
      res.json(data)
    }, function (err) {
      res.send(err)
    })
  }

  return CommandController
}
