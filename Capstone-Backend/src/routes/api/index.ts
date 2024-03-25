import Express from 'express';
import exerciseRouter from './exercise';
import workoutRouter from './workout';
import muscleRouter from './muscle';
// eslint-disable-next-line
const router = Express.Router();

router.use('/exercise', exerciseRouter);
router.use('/workout', workoutRouter);
router.use('/muscle', muscleRouter);
// router.use('/user', userRouter);

export default router;
