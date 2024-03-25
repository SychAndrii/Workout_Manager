import {Request, Response} from 'express';
import ErrorSender from '../../../../utils/senders/ErrorSender';
import WorkoutService from '../../../../services/workout';

export default async (req: Request, res: Response) => {
    try {
        const newWorkout = req.body;
        const addedWorkout = await WorkoutService.addWorkout(newWorkout);
        res.json(addedWorkout);
    } catch (error) {
        const err = error as Error;
        ErrorSender.sendError(res, err);
    }
};
