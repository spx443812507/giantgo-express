const messageService = require('../services/messageService')

module.exports.broadcast = function (req, res, next) {
  const command = req.body.command
  const data = req.body.data

  messageService.broadcast(command, data).then(function (data) {
    res.json(data)
  }, function (err) {
    res.send(err)
  })
}
