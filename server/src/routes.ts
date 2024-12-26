import { Router } from 'express';
import { registerController } from './controllers/registerController';
import { loginController } from './controllers/loginController';
import { profileController } from './controllers/profileController';
import { logoutController } from './controllers/logoutController';
import { createChatController } from './controllers/createChatController';
import { authTokenMiddleware } from './middleware/authTokenMiddleware';
import { deleteChatController } from './controllers/deleteChatController';
import { updateChatController } from './controllers/updateChatController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authTokenMiddleware, profileController);
router.post('/logout', logoutController);

router.post('/chat', authTokenMiddleware, createChatController);
router.put('/chat/:chatId', authTokenMiddleware, updateChatController);
router.delete('/chat/:chatId', deleteChatController);

export default router;