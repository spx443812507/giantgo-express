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

    try {
      self.socket.on('subscribe', self.onSubscribe.bind(self))

      self.socket.on('publish', self.onPublish.bind(self))

      self.socket.on('disconnect', self.onDisconnect.bind(self))
    } catch (e) {
      console.log(e)
    }
  }

  SocketController.prototype.onSubscribe = function (data) {
    const self = this

    console.log('客户端：' + self.socket.id + ' 订阅命令：' + data.command)

    socketService.subscribe(self.socket, data)
  }

  SocketController.prototype.onPublish = function (packet) {
    const self = this

    console.log('客户端：' + self.socket.id + ' 发布命令：' + command)

    self.io.of(packet.namespace).to(packet.room || packet.command).emit(packet.command, packet.data)
  }

  SocketController.prototype.onDisconnect = function (reason) {
    const self = this

    console.log('客户端：' + self.socket.id + '断开连接')

    socketService.disconnect(self.socket, reason)
  }

  return SocketController
}
