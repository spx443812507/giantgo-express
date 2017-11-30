const redis = require('../db/redis')
const moment = require('moment')

module.exports = function SocketServiceModule () {
  function SocketService () {

  }

  SocketService.prototype.subscribe = function (socket, data) {
    const namespace = socket.nsp.name
    const command = data.command
    const room = data.room || command

    socket.join(room)

    redis.rpush('logs:room:' + room + ':socket:' + socket.id, JSON.stringify({
      type: 'subscribe',
      namespace: namespace,
      command: command,
      room: room,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))
  }

  SocketService.prototype.disconnect = function (socket, reason) {
    const room = socket.handshake.query.room
    const namespace = socket.nsp.name

    redis.rpush('logs:socket:' + socket.id, JSON.stringify({
      type: 'disconnect',
      namespace: namespace,
      room: room,
      reason: reason,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))
  }

  return SocketService
}
