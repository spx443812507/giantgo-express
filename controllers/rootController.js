const socketBaseHandler = require('./socketBaseHandler')

function RootController (socket) {
  const self = this

  self.onConnection(socket)
}

RootController.prototype = socketBaseHandler

module.exports = RootController
