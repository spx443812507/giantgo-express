let io = require('socket.io')
const socketService = require('./services/socketService')

function onSubscribe (socket, data) {
  socketService.subscribe(socket.id, data.command, data.params)
}

function onDisconnect (socket, reason) {
  console.log(reason)
  socketService.unSubscribe(socket.id)
}

module.exports.io = io

module.exports.use = function (server) {
  this.io = io(server)

  this.io.on('connection', function (socket) {
    console.log(socket.id)

    socket.on('subscribe', function (data) {
      onSubscribe(socket, data)
    })

    socket.on('disconnect', (reason) => {
      onDisconnect(socket, reason)
    })
  })
}
