const SocketBaseController = require('./socketBaseController')

function RootController (socket) {
  const self = this

  SocketBaseController.call(self, socket)

  console.log('客户端：' + self.socket.id + '已连接，命名空间' + socket.nsp.name)
}

RootController.namespace = '/'

const proto = RootController.prototype = SocketBaseController.prototype
proto.constructor = RootController

module.exports = RootController
