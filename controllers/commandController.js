const commands = require('../commands')

class CommandController {
  constructor () {
  }

  static broadcast (req, res) {
    try {
      const namespace = req.body.namespace || '/'
      if (commands.hasOwnProperty(namespace)) {
        commands[namespace].publish(req.body)
      }
      res.json('success')
    } catch (e) {
      res.send(e.message)
    }
  }
}

module.exports = CommandController
