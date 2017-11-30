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

    try {
      commandService.broadcast(command, data, namespace, room)
      res.json('success')
    } catch (e) {
      res.send(e)
    }
  }

  return CommandController
}
