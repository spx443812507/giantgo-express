import * as emitter from 'socket.io-emitter';
import * as redis from '../db/redis';
import * as config from '../config/config';

const io = emitter(config.redis);

export default class CommandController {
  broadcast(req: any, res: any, next: any) {
    const command = req.body.command;
    const room = req.body.room;
    const namespace = req.body.namespace;
    const data = req.body.data;

    try {
      io.of(namespace || '/').to(room || command).emit(command, data);

      redis.rpush('logs:command:' + command, JSON.stringify(data));

      res.json('success');
    } catch (e) {
      res.send(e);
    }
  }
}
