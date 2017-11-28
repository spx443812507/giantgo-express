let io = require('socket.io')
const redis = require('socket.io-redis')
const redisConfig = require('./config/config').redis
const SocketController = require('./controllers/socketController')()

function SocketFactory () {
  this.io = require('socket.io-emitter')(redisConfig)
}

SocketFactory.prototype.use = function (server) {
  io = io(server, {path: '/socketio/socket.io'})

  io.adapter(redis(redisConfig))

  io.on('connection', function (socket) {
    new SocketController(socket, io)
  })

  io.of('/webinar').on('connection', function (socket) {
    new SocketController(socket)
  })
}

module.exports = new SocketFactory()
