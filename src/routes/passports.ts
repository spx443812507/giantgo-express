import * as express from 'express';
import PassportController from '../controllers/passportController';

const router = express.Router();
const passportController = new PassportController();

/* GET users listing. */
router.get('/', passportController.signUp);

export default router;
