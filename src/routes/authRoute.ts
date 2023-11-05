import { Router } from 'express';
import AuthController from '@controllers/AuthController';
import AuthValidator from '@validators/AuthValidator';
import { isAuth } from '../middlewares/auth';

const router = Router();

const authController = new AuthController();
const authValidator = new AuthValidator();

router.post('/login', authValidator.loginValidator, authController.login);
router.get('/profile', isAuth, authController.me);

export default router;
