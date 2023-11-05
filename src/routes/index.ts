import { Router } from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';

const router = Router();

router.use(authRoute);
router.use('/user', userRoute);

export default router;
