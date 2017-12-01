const WebinarController = require('./controllers/webinarController')
const RootController = require('./controllers/rootController')

module.exports = function SocketFactoryModule (io) {
  function SocketFactory (io) {
    const self = this

    self.io = io

    self.use(RootController)
    self.use(WebinarController)
  }

  SocketFactory.prototype.use = function (controller) {
    const self = this

    self.io.of(controller.namespace).on('connection', function (socket) {
      new controller(socket)
    })
  }

  new SocketFactory(io)
}
