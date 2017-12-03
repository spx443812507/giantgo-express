const socketBaseHandler = require('./socketBaseHandler')

function WebinarController (socket) {
  const self = this

  self.onConnection(socket)

  self.subscribeHandlers.userJoin = function (data) {
    const self = this

  }

  self.publishHandlers.userJoin = function (data) {
    const self = this

    self.io.of(self.namespace).to(data.room || data.command).emit(data.command, data.data)
  }
}

WebinarController.prototype = socketBaseHandler

module.exports = WebinarController
