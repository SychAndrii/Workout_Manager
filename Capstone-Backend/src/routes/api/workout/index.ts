import Express from 'express';
import addWorkout from './post/addWorkout';
import getUserWorkouts from './get/getUserWorkouts';

// eslint-disable-next-line
const router = Express.Router();

router.post('/', addWorkout);

router.get('/', getUserWorkouts);

export default router;
