import * as io from 'socket.io';
import * as redis from 'socket.io-redis';
import * as _ from 'lodash';
import * as config from './config/config';

export default class SocketFactory {
  io: any;
  handlers: Array<any>;
  constructor() {

  }
  adapter(server: any) {
    this.io = io(server, {
      path: config.mysql.host
    });
    this.io.adapter(redis(config.redis));
    _.forEach(this.handlers, function (handler) {
      this.io.of(handler.namespace).on('connection', function (socket: any) {
        const controller = new handler.controller(socket);
      });
    });
  }

  use(namespace: string, controller: any) {
    this.handlers.push({
      namespace: namespace,
      controller: controller
    });
  }
}
