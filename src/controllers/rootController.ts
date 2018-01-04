import SocketBaseHandler from './socketBaseHandler';

export default class RootController extends SocketBaseHandler {
  constructor(socket: any) {
    super();
    this.onConnection(socket);
  }
}
