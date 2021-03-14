import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.get('/user', UserController.index);
router.post('/user', UserController.store);

export default router;
