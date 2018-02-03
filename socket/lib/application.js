class Application {
  constructor (namespace) {
    if (!namespace || typeof (namespace) !== 'string') {
      throw new TypeError('namespace requires string')
    }

    this.namespace = namespace
    this.commanders = {}
  }

  command (cmd, Commander) {
    if (!this.commanders.hasOwnProperty(cmd)) {
      const commander = new Commander()
      commander.command = cmd
      commander.nsp = commander.io.of(this.namespace)

      this.commanders[cmd] = commander
    }
  }

  onConnection (socket) {
    console.log('客户端：' + socket.id + ' 已连接，命名空间' + socket.nsp.name)

    for (const commander in this.commanders) {
      if (this.commanders.hasOwnProperty(commander)) {
        socket.on(commander, (data, ack) => {
          this.commanders[commander].handle(data, socket, ack)
        })
      }
    }

    socket.on('error', (error) => {
      this.onError(error)
    })

    socket.on('subscribe', (data, ack) => {
      this.subscribe(data, socket, ack)
    })

    socket.on('publish', (data, ack) => {
      this.publish(data, socket, ack)
    })
  }

  onError (error) {
    console.log(error)
  }

  subscribe (data, socket, ack) {
    if (Object.prototype.toString.call(data) === '[object String]') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        throw new Error('param format is not correct (example: {command: "userJoin"})')
      }
    }

    const command = data.command

    console.log('客户端：' + socket.id + ' 订阅命令：' + data.command)

    if (this.commanders && this.commanders.hasOwnProperty(command) && typeof this.commanders[command].subscribe === 'function') {
      this.commanders[command].subscribe(data, socket, ack)
    }
  }

  publish (data, socket, ack) {
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
      this.commanders[command].publish(data, socket, ack)
    }
  }
}

module.exports = Application
