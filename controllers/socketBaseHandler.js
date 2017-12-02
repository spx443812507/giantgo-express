const redis = require('../db/redis')
const moment = require('moment')
const ioEmitter = require('socket.io-emitter')(require('../config/config').redis)

module.exports = {
  io: ioEmitter,
  socket: null,
  namespace: null,
  subscribeHandlers: {},
  publishHandlers: {},
  onConnection: function (socket) {
    const self = this

    self.socket = socket
    self.namespace = socket.nsp.name

    console.log('客户端：' + socket.id + '已连接，命名空间' + socket.nsp.name)

    try {
      self.socket.on('subscribe', self.subscribe.bind(self))

      self.socket.on('publish', self.publish.bind(self))

      self.socket.on('disconnect', self.disconnect.bind(self))
    } catch (e) {
      console.log(e)
    }
  },
  subscribe: function (data) {
    const self = this
    const command = data.command
    const room = data.room || data.command

    console.log('客户端：' + self.socket.id + ' 订阅命令：' + data.command)

    self.socket.join(room)

    redis.rpush('logs:room:' + room + ':socket:' + self.socket.id, JSON.stringify({
      type: 'subscribe',
      namespace: self.namespace,
      command: command,
      room: room,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))

    if (self.subscribeHandlers && self.subscribeHandlers.hasOwnProperty(command)) {
      self.subscribeHandlers[command].call(self, data)
    }
  },
  publish: function (data) {
    const self = this
    const command = data.command
    const room = data.room

    console.log('客户端：' + self.socket.id + ' 发布命令：' + data.command)

    redis.rpush('logs:room:' + room + 'socket:' + self.socket.id, JSON.stringify({
      type: 'publish',
      namespace: self.namespace,
      command: command,
      room: room,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))

    if (self.publishHandlers && self.publishHandlers.hasOwnProperty(command)) {
      self.publishHandlers[command].call(self, data)
    }
  },
  disconnect: function (reason) {
    const self = this

    console.log('客户端：' + self.socket.id + '断开连接')

    redis.rpush('logs:disconnect:socket:' + self.socket.id, JSON.stringify({
      namespace: self.namespace,
      reason: reason,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))
  }
}
