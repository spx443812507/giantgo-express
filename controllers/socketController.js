const SocketService = require('../services/socketService')()
const socketService = new SocketService()

module.exports = function SocketControllerModule () {
  function SocketController (socket, io) {
    const self = this

    //当前socket实例
    self.socket = socket
    //链接池实例
    self.io = io
    //命名空间
    self.namespace = socket.nsp.name
    //房间名
    self.room = socket.handshake.query.room

    console.log('客户端：' + socket.id + '已连接')

    if (self.room) {
      socket.join(self.room)
    }

    self.socket.on('subscribe', self.onSubscribe.bind(self))

    self.socket.on('message', self.onMessage.bind(self))

    self.socket.on('publish', self.onPublish.bind(self))

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
   * 接收到消息事件
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

    self.io.of(self.namespace).to(self.room).emit('message', content)
  }

  SocketController.prototype.onPublish = function (command, data) {
    const self = this

    self.io.of(self.namespace).to(self.room).emit(command, data)

    console.log('客户端：' + self.socket.id + ' 发布命令：' + command)
  }

  SocketController.prototype.onDisconnect = function (reason) {
    const self = this

    console.log('客户端：' + self.socket.id + '断开连接')

    socketService.disconnect(self.socket, reason)
  }

  return SocketController
}
