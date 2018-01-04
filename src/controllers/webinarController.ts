import SocketBaseHandler from './socketBaseHandler';

export default class WebinarController extends SocketBaseHandler {
  constructor(socket: any) {
    super();
    this.onConnection(socket);

    this.subscribeHandlers.userJoin = (data: any) => {
    };

    this.publishHandlers.userJoin = (data: any) => {
      this.io.of(this.namespace).to(data.room || data.command).emit(data.command, data.data);
    };
  }
}
