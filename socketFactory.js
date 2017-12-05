let io = require('socket.io')
const redis = require('socket.io-redis')
const config = require('./config/config')
const _ = require('lodash')

function SocketFactory () {
  const self = this

  // socket.io实例
  self.io = null
  // 注册的命名空间
  self.handlers = []
}

SocketFactory.prototype.adapter = function (server) {
  const self = this

  self.io = io(server, {
    path: config.socketPath
  })
  self.io.adapter(redis(config.redis))

  _.forEach(self.handlers, function (handler) {
    self.io.of(handler.namespace).on('connection', function (socket) {
      const controller = new handler.Controller(socket)
      console.log(controller)
    })
  })
}

/**
 * 注册命名空间
 * @param namespace   命名空间名称
 * @param controller  控制器
 */
SocketFactory.prototype.use = function (namespace, controller) {
  const self = this

  self.handlers.push({
    namespace: namespace,
    Controller: controller
  })
}

module.exports = SocketFactory
