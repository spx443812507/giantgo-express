class Application {
  constructor (namespace) {
    if (!namespace || typeof(namespace) !== 'string') {
      throw new TypeError('namespace requires string')
    }

    this.namespace = namespace
    this.commanders = {}
  }

  command (cmd, commander) {
    if (!this.commanders.hasOwnProperty(cmd)) {
      this.commanders[cmd] = commander
    }
  }

  onConnection (socket) {
    console.log('客户端：' + socket.id + '已连接，命名空间' + socket.nsp.name)

    for (const commander in this.commanders) {
      if (this.commanders.hasOwnProperty(commander)) {
        socket.on(commander, data => {
          this.commanders[commander].handle(data, socket)
        })
      }
    }

    socket.on('subscribe', data => {
      this.subscribe(data, socket)
    })
    socket.on('publish', data => {
      this.publish(data, socket)
    })
  }

  subscribe (data, socket) {
    if (Object.prototype.toString.call(data) === '[object String]') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        throw new Error('param format is not correct (example: {room: "room1", command: "userJoin", namespace: "/"})')
      }
    }

    const command = data.command
    const room = data.room || command

    console.log('客户端：' + socket.id + ' 订阅命令：' + data.command)

    socket.join(room)

    if (this.commanders && this.commanders.hasOwnProperty(command) && typeof this.commanders[command].subscribe === 'function') {
      this.commanders[command].subscribe(data, socket)
    }
  }

  publish (data, socket = undefined) {
    if (Object.prototype.toString.call(data) === '[object String]') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        throw new Error('param format is not correct (example: {room: "room1", command: "userJoin", namespace: "/"})')
      }
    }

    const command = data.command

    if (socket) {
      console.log('客户端：' + socket.id + ' 发布命令：' + data.command)
    } else {
      console.log('外部发布命令：' + data.command)
    }

    if (this.commanders && this.commanders.hasOwnProperty(command) && typeof this.commanders[command].publish === 'function') {
      this.commanders[command].publish(data, socket)
    }
  }
}

module.exports = Application
