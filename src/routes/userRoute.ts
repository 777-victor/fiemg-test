import { Router } from 'express';
import UserController from '@controllers/UserController';
import UserValidator from '@validators/UserValidator';

const router = Router();

const userController = new UserController();
const userValidator = new UserValidator();

router.post('/', userValidator.userCreateValidator, userController.create);
router.get('/:id', userValidator.paramsIdValidator, userController.getUser);
router.put('/:id', userValidator.userUpdateValidator, userController.update);
router.delete('/:id', userValidator.paramsIdValidator, userController.delete);

// router.post('/me', userValidator.getUser);

export default router;
