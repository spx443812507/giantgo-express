const SocketBaseController = require('./socketBaseController')

function WebinarController (socket) {
  const self = this

  SocketBaseController.call(self, socket)

  console.log('客户端：' + self.socket.id + '已连接，命名空间' + socket.nsp.name)
}

WebinarController.namespace = '/webinar'

const proto = WebinarController.prototype = SocketBaseController.prototype
proto.constructor = WebinarController

module.exports = WebinarController
