const webinarController = require('./webinarController')

module.exports = function CommandControllerModule () {
  function CommandController () {

  }

  CommandController.prototype.broadcast = function (req, res, next) {
    try {
      webinarController.publish({
        command: req.body.command,
        room: req.body.room,
        namespace: req.body.namespace,
        data: req.body.data
      })
      res.json('success')
    } catch (e) {
      res.send(e)
    }
  }

  return CommandController
}
