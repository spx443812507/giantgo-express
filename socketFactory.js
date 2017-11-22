let io = require('socket.io')
const SocketService = require('./services/socketService')()
const socketService = new SocketService()

function SocketFactory () {
  this.io = ''
}

SocketFactory.prototype.use = function (server) {
  this.io = io(server, {path: '/socketio/socket.io'})

  this.io.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
      onSubscribe(socket, data)
    })

    socket.on('disconnect', (reason) => {
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
