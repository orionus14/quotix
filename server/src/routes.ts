import { Application, Router } from 'express';
import { registerController } from './controllers/registerController';
import { loginController } from './controllers/loginController';
import { profileController } from './controllers/profileController';
import { logoutController } from './controllers/logoutController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', profileController);
router.post('/logout', logoutController);

export default router;