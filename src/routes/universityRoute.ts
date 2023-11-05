import { Router } from 'express';
import UniversityController from '@controllers/UniversityController';
import UniversityValidator from '@validators/UniversityValidator';
import { isAuth } from '@middlewares/auth';

const router = Router();

const universityController = new UniversityController();
const universityValidator = new UniversityValidator();

router.get(
  '',
  isAuth,
  universityValidator.listValidator,
  universityController.list,
);

export default router;
