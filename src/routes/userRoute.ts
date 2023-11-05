import { Router } from 'express';
import UserController from '@controllers/UserController';
import UserValidator from '@validators/UserValidator';
import { isAuth } from '@middlewares/auth';

const router = Router();

const userController = new UserController();
const userValidator = new UserValidator();

router.post(
  '/',
  isAuth,
  userValidator.userCreateValidator,
  userController.create,
);
router.get(
  '/:id',
  isAuth,
  userValidator.paramsIdValidator,
  userController.getUser,
);
router.put(
  '/:id',
  isAuth,
  userValidator.userUpdateValidator,
  userController.update,
);
router.delete(
  '/:id',
  isAuth,
  userValidator.paramsIdValidator,
  userController.delete,
);

export default router;
