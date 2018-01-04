const SocketBaseHandler = require('./socketBaseHandler')

class RootController extends SocketBaseHandler {
  constructor (socket) {
    super(socket)
    this.onConnection(socket)
  }
}

module.exports = RootController
