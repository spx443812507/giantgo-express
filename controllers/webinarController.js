const socketBaseHandler = require('./socketBaseHandler')

function WebinarController () {

}

WebinarController.prototype = socketBaseHandler

const webinarController = new WebinarController()

webinarController.subscribeHandlers.userJoin = function (data) {
  const self = this

}

webinarController.publishHandlers.userJoin = function (data) {
  const self = this

  self.io.of(self.namespace).to(data.room || data.command).emit(data.command, data.data)
}

module.exports = webinarController
