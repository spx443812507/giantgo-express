const SocketFactory = require('../../socket')
const config = require('config')

class UserJoinCommand extends SocketFactory.Commander {
  constructor () {
    super(config.get('redis'))
  }

  handle (data, socket) {

  }
}

module.exports = UserJoinCommand
