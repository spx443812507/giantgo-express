import * as express from 'express';
import CommandController from '../controllers/commandController';

const router = express.Router();
const commandController = new CommandController();

/* GET users listing. */
router.post('/', commandController.broadcast);

export default router;
