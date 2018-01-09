const emitter = require('socket.io-emitter')
const redis = require('../db/redis')
const config = require('../config')

module.exports = function CommandServiceModule () {
  function CommandService () {
    this.io = emitter(config.redis)
  }

  CommandService.prototype.broadcast = (command, data, namespace, room) => {
    this.io.of(namespace || '/').to(room || command).emit(command, data)

    redis.rpush('logs:command:' + command, JSON.stringify(data))
  }

  return CommandService
}
