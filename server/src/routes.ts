import { Router } from 'express';
import { registerController } from './controllers/registerController';
import { loginController } from './controllers/loginController';
import { profileController } from './controllers/profileController';
import { logoutController } from './controllers/logoutController';
import { createChatController } from './controllers/createChatController';
import { authTokenMiddleware } from './middleware/authTokenMiddleware';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', profileController);
router.post('/logout', logoutController);

// router.get('/chat', getChatsController);
router.post('/chat', authTokenMiddleware, createChatController);
// router.put('/chat/:id', updateChatController);
// router.delete('/chat/:id', deleteChatController);

export default router;