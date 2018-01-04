import * as redis from '../db/redis';
import * as config from '../config/config';
import * as emitter from 'socket.io-emitter';

const io = emitter(config.redis);

module.exports = function CommandServiceModule() {
  function CommandService() {

  }

  CommandService.prototype.broadcast = function (command, data, namespace, room) {
    io.of(namespace || '/').to(room || command).emit(command, data);

    redis.rpush('logs:command:' + command, JSON.stringify(data));
  };

  return CommandService;
};
