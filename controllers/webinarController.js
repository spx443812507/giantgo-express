const SocketBaseHandler = require('./socketBaseHandler')

class WebinarController extends SocketBaseHandler {
  constructor (socket) {
    super(socket)
    this.onConnection(socket)
    
    this.subscribeHandlers.userJoin = function (data) {
    }

    this.publishHandlers.userJoin = function (data) {
      const self = this

      self.io.of(self.namespace).to(data.room || data.command).emit(data.command, data.data)
    }
  }
}

module.exports = WebinarController
