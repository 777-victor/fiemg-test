import { Router } from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';
import universityRoute from './universityRoute';
const router = Router();

router.use(authRoute);
router.use('/user', userRoute);
router.use('/university', universityRoute);

// router.post('/loadUniversities', userRoute);

export default router;
