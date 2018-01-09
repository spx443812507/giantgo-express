const emitter = require('socket.io-emitter')

class Commander {
  constructor (redisUrl) {
    this.io = emitter(redisUrl)
  }

  handle () {
    throw new Error('handle method need rewrite')
  }

  subscribe (data, socket) {

  }

  publish (data, socket = undefined) {
    let namespace = data.namespace || (socket ? socket.nsp.name : '/')
    this.io.of(namespace).to(data.room || data.command).emit(data.command, data.data)
  }
}

module.exports = Commander
