const redis = require('../db/redis')
const config = require('../config/config')
const moment = require('moment')
const Exception = require('./exception')
const emitter = require('socket.io-emitter')

class SocketBaseHandler {
  constructor () {
    this.io = emitter(config.redis)
    this.socket = undefined
    this.namespace = '/'
    this.subscribeHandlers = {}
    this.publishHandlers = {}
  }

  onConnection (socket) {
    this.socket = socket
    this.namespace = socket.nsp.name

    console.log('客户端：' + this.socket.id + '已连接，命名空间' + this.socket.nsp.name)

    try {
      this.socket.on('subscribe', this.subscribe.bind(this))

      this.socket.on('publish', this.publish.bind(this))

      this.socket.on('disconnect', this.disconnect.bind(this))
    } catch (e) {
      console.log(e)
    }
  }

  subscribe (data) {
    if (Object.prototype.toString.call(data) === '[object String]') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        throw new Exception(400, 'param format is not correct (example: {room: "room1", command: "userJoin", namespace: "/"})')
      }
    }

    const command = data.command
    const room = data.room || command

    console.log('客户端：' + this.socket.id + ' 订阅命令：' + data.command)

    this.socket.join(room)

    redis.rpush('logs:room:' + room + ':socket:' + this.socket.id, JSON.stringify({
      type: 'subscribe',
      namespace: this.namespace,
      command: command,
      room: room,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))

    if (this.subscribeHandlers && this.subscribeHandlers.hasOwnProperty(command)) {
      this.subscribeHandlers[command].call(this, data)
    }
  }

  publish (data) {
    if (Object.prototype.toString.call(data) === '[object String]') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        throw new Exception(400, 'param format is not correct (example: {room: "room1", command: "userJoin", namespace: "/"})')
      }
    }

    const command = data.command
    const room = data.room
    const namespace = data.namespace || this.namespace

    console.log('客户端：' + this.socket.id + ' 发布命令：' + data.command)

    redis.rpush('logs:room:' + room + ':socket:' + this.socket.id, JSON.stringify({
      type: 'publish',
      namespace: namespace,
      command: command,
      room: room,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))

    if (this.publishHandlers && this.publishHandlers.hasOwnProperty(command)) {
      this.publishHandlers[command].call(this, data)
    } else {
      this.io.of(namespace).to(data.room || data.command).emit(data.command, data.data)
    }
  }

  disconnect (reason) {
    console.log('客户端：' + this.socket.id + '断开连接')

    redis.rpush('logs:disconnect:socket:' + this.socket.id, JSON.stringify({
      namespace: this.namespace,
      reason: reason,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))
  }
}

module.exports = SocketBaseHandler
