const redis = require('../db/redis')
const io = require('socket.io-emitter')(require('../config/config').redis)

module.exports = function CommandControllerModule () {
  function CommandController () {

  }

  CommandController.prototype.broadcast = function (req, res, next) {
    const command = req.body.command
    const room = req.body.room
    const namespace = req.body.namespace
    const data = req.body.data

    try {
      io.of(namespace || '/').to(room || command).emit(command, data)

      redis.rpush('logs:command:' + command, JSON.stringify(data))

      res.json('success')
    } catch (e) {
      res.send(e)
    }
  }

  return CommandController
}
