const SocketService = require('../services/socketService')()
const socketService = new SocketService()

module.exports = function SocketControllerModule () {
  function SocketController (socket, io) {
    const self = this
    const room = socket.handshake.query.room

    //当前socket实例
    self.socket = socket
    //链接池实例
    self.io = io

    console.log('客户端：' + socket.id + '已连接')

    if (room) {
      socket.join(room)
    }

    self.socket.on('subscribe', self.onSubscribe.bind(self))

    self.socket.on('message', self.onMessage.bind(self))

    self.socket.on('disconnect', self.onDisconnect.bind(self))
  }

  SocketController.prototype.onSubscribe = function (data) {
    const self = this

    console.log('客户端：' + self.socket.id + ' 订阅命令：' + data.command)

    socketService.subscribe(self.socket, data).then(function () {
      self.socket.join(data.command)
    })
  }

  /**
   * 接收到消息时间
   * @param message
   * {
   *    to: {
   *      type: 'room', //namespace, room, socket
   *      target:
   *    }
   * }
   */
  SocketController.prototype.onMessage = function (message) {
    const self = this
    const rooms = Object.keys(self.socket.rooms)
    const to = message.to
    const content = message.content

    console.log('客户端：' + self.socket.id + ' 广播消息：' + message)

    self.socket.broadcast.emit('message', content)
  }

  SocketController.prototype.onDisconnect = function (reason) {
    const self = this

    console.log('客户端：' + self.socket.id + '断开连接')

    socketService.disconnect(self.socket, reason)
  }

  return SocketController
}
