let io = require('socket.io')
const redis = require('socket.io-redis')
const redisConfig = require('./config/config').redis
const SocketService = require('./services/socketService')()
const socketService = new SocketService()

function SocketFactory () {

}

SocketFactory.prototype.use = function (server) {
  io = io(server, {path: '/socketio/socket.io'})

  io.adapter(redis(redisConfig))

  io.on('connection', function (socket) {
    console.log('客户端：' + socket.id + '已连接')

    socket.on('subscribe', function (data) {
      onSubscribe(socket, data)
    })

    socket.on('disconnect', (reason) => {
      console.log('客户端：' + socket.id + '断开连接')

      onDisconnect(socket, reason)
    })
  })
}

function onSubscribe (socket, data) {
  socketService.subscribe(socket.id, data.command, data.params)
}

function onDisconnect (socket, reason) {
  socketService.unSubscribe(socket.id, reason)
}

module.exports = new SocketFactory()
