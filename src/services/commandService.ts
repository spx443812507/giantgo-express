const redis = require('../db/redis')
const io = require('socket.io-emitter')(require('../config/config').redis)

module.exports = function CommandServiceModule () {
  function CommandService () {

  }

  CommandService.prototype.broadcast = function (command, data, namespace, room) {
    io.of(namespace || '/').to(room || command).emit(command, data)

    redis.rpush('logs:command:' + command, JSON.stringify(data))
  }

  return CommandService
}
