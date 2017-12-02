let io = require('socket.io')
const redis = require('socket.io-redis')
const config = require('./config/config')
const _ = require('lodash')

function SocketFactory () {
  const self = this

  //socket.io实例
  self.io = null
  //注册的命名空间
  self.handlers = []
}

SocketFactory.prototype.adapter = function (server) {
  const self = this

  self.io = io(server, {path: config.socketPath})
  self.io.adapter(redis(config.redis))

  _.forEach(self.handlers, function (handler) {
    self.io.of(handler.namespace).on('connection', handler.controller.onConnection.bind(handler.controller))
  })
}

/**
 * 注册命名空间
 * @param namespace           命名空间名称
 * @param controllerInstance  控制器实例
 */
SocketFactory.prototype.use = function (namespace, controllerInstance) {
  const self = this

  self.handlers.push({
    namespace: namespace,
    controller: controllerInstance
  })
}

module.exports = SocketFactory
