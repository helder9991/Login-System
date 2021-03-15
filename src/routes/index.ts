import { Router } from 'express';

import AuthenticationController from '../controllers/AuthenticationController';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/user', UserController.index);
router.post('/user', UserController.store);

router.post('/auth', AuthenticationController.store);

export default router;
