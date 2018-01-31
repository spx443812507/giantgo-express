const _ = require('lodash')
class Application {
  constructor (namespace) {
    if (!namespace || typeof (namespace) !== 'string') {
      throw new TypeError('namespace requires string')
    }

    // 命名空间
    this.namespace = namespace
    // 注册的命令
    this.commanders = {}
    // 存储延迟执行的命令
    this.debounces = {}
  }

  command (cmd, Commander) {
    if (!this.commanders.hasOwnProperty(cmd)) {
      const commander = new Commander()
      commander.command = cmd
      commander.nsp = commander.io.of(this.namespace)

      if (commander.debounce) {
        this.debounces[cmd] = {}
      }

      this.commanders[cmd] = commander
    }
  }

  onConnection (socket) {
    let query = socket.handshake.query
    let pid = query.pid
    let transport = query.transport

    // 如果是长轮训方式连接，延迟disconnect的执行
    if (transport === 'polling' && pid) {
      if (this.debounces.hasOwnProperty('disconnect') && this.debounces.disconnect.hasOwnProperty(pid)) {
        this.debounces.disconnect[pid].cancel()
        delete this.debounces.disconnect[pid]
      }
    }

    for (const commander in this.commanders) {
      if (this.commanders.hasOwnProperty(commander)) {
        let handle = (data, fn) => {
          this.commanders[commander].handle(data, socket, fn)
        }
        // 如果握手信息中有pid并且需要debounce（减速）
        if (pid && this.commanders[commander].debounce) {
          if (this.debounces[commander].hasOwnProperty(pid)) {
            handle = this.debounces[commander][pid]
          } else {
            this.debounces[commander][pid] = handle = _.debounce((data, fn) => {
              this.commanders[commander].handle(data, socket, fn)
              delete this.debounces[commander][pid]
            }, this.commanders[commander].debounce)
          }
        }

        socket.on(commander, handle)
      }
    }

    socket.on('error', (error) => {
      this.onError(error)
    })

    socket.on('subscribe', (data, fn) => {
      this.subscribe(data, socket, fn)
    })
    socket.on('publish', (data, fn) => {
      this.publish(data, socket, fn)
    })

    console.log('客户端：' + socket.id + ' 已连接，命名空间' + socket.nsp.name)
  }

  onError (error) {
    console.log(error)
  }

  subscribe (data, socket, fn) {
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
      this.commanders[command].subscribe(data, socket, fn)
    }
  }

  publish (data, socket, fn) {
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
      this.commanders[command].publish(data, socket, fn)
    }
  }
}

module.exports = Application
