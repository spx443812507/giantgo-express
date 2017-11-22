const MessageService = require('../services/messageService')()
const messageService = new MessageService()

module.exports = function MessageControllerModule () {
  function MessageController () {

  }

  MessageController.prototype.broadcast = function (req, res, next) {
    const command = req.body.command
    const data = req.body.data

    messageService.broadcast(command, data).then(function (data) {
      res.json(data)
    }, function (err) {
      res.send(err)
    })
  }

  return MessageController
}
