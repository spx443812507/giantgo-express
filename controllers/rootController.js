const socketBaseHandler = require('./socketBaseHandler')

function RootController (socket) {

}

RootController.prototype = socketBaseHandler

const rootController = new RootController()

module.exports = rootController
