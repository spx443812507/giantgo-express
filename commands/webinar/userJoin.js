const SocketFactory = require('../../socket')
const config = require('../../config')

class UserJoinCommand extends SocketFactory.Commander {
  constructor () {
    super(config.redis)
  }

  handle (data, socket) {

  }
}

module.exports = UserJoinCommand
