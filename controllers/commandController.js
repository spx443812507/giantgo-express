const redis = require('../db/redis')
const config = require('../config/config')
const emitter = require('socket.io-emitter')

class CommandController {
  constructor () {
    this.io = emitter(config.redis)
  }

  broadcast (req, res) {
    const command = req.body.command
    const room = req.body.room
    const namespace = req.body.namespace
    const data = req.body.data

    try {
      this.io.of(namespace || '/').to(room || command).emit(command, data)

      redis.rpush('logs:command:' + command, JSON.stringify(data))

      res.json('success')
    } catch (e) {
      res.send(e)
    }
  }
}

module.exports = CommandController
