import { Router } from 'express';
import UserController from '@controllers/UserController';
// import { auth } from '@middlewares/auth.js';
import UserValidator from '@validators/UserValidator';

const router = Router();

const userController = new UserController();
const userValidator = new UserValidator();

// router.post('/', userController. )

router.post('/', userValidator.userCreateValidator, userController.create);
router.get('/:id', userController.getUser);
router.put('/:id', userValidator.userUpdateValidator, userController.update);
// // router.post('/email-exists', userValidator.checkEmailValidator, authController.checkEmail);
// // router.post('/login', userValidator.userLoginValidator, authController.login);
// // router.post('/refresh-token', authController.refreshTokens);
// // router.post('/logout', authController.logout);
// // router.put(
// //     '/change-password',
// //     auth(),
// //     userValidator.changePasswordValidator,
// //     authController.changePassword
// // );

export default router;
