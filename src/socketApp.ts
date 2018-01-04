import SocketFactory from './socketFactory';

const socketFactory = new SocketFactory();

const webinarController = require('./controllers/webinarController');
const rootController = require('./controllers/rootController');

socketFactory.use('/', rootController);
socketFactory.use('/webinar', webinarController);

export default socketFactory;
