const CommandService = require('../services/commandService')()
const commandService = new CommandService()

module.exports = function CommandControllerModule () {
  function CommandController () {

  }

  CommandController.prototype.broadcast = function (req, res, next) {
    const command = req.body.command
    const room = req.body.room
    const namespace = req.body.namespace
    const data = req.body.data

    commandService.broadcast(command, data, namespace, room).then(function (data) {
      res.json(data)
    }, function (err) {
      res.send(err)
    })
  }

  CommandController.prototype.getCommandList = function (req, res, next) {
    commandService.getCommandList().then(function (data) {
      console.log(req.app.settings.port)

      res.json(data)
    }, function (err) {
      res.send(err)
    })
  }

  return CommandController
}
