import { Router } from 'express';
import AuthController from '@controllers/AuthController';
import AuthValidator from '@validators/AuthValidator';

const router = Router();

const authController = new AuthController();
const authValidator = new AuthValidator();

router.post('/login', authValidator.loginValidator, authController.login);

export default router;
