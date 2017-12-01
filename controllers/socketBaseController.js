const redis = require('../db/redis')
const moment = require('moment')

function SocketBaseController (socket) {
  const self = this

  self.socket = socket
  self.io = require('socket.io-emitter')(require('../config/config').redis)

  try {
    self.socket.on('subscribe', self.onSubscribe.bind(self))

    self.socket.on('publish', self.onPublish.bind(self))

    self.socket.on('disconnect', self.onDisconnect.bind(self))
  } catch (e) {
    console.log(e)
  }
}

SocketBaseController.prototype.onSubscribe = function (data) {
  const self = this
  const command = data.command
  const room = data.room || command

  console.log('客户端：' + self.socket.id + ' 订阅命令：' + data.command)

  self.socket.join(room)

  redis.rpush('logs:room:' + room + ':socket:' + self.socket.id, JSON.stringify({
    type: 'subscribe',
    namespace: self.namespace,
    command: command,
    room: room,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  }))
}

SocketBaseController.prototype.onPublish = function (packet) {
  const self = this

  console.log('客户端：' + self.socket.id + ' 发布命令：' + command)

  self.io.of(packet.namespace).to(packet.room || packet.command).emit(packet.command, packet.data)
}

SocketBaseController.prototype.onDisconnect = function (reason) {
  const self = this

  console.log('客户端：' + self.socket.id + '断开连接')

  redis.rpush('logs:socket:' + self.socket.id, JSON.stringify({
    type: 'disconnect',
    namespace: self.namespace,
    reason: reason,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  }))
}

module.exports = SocketBaseController
