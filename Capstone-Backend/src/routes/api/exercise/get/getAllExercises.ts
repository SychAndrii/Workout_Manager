import {Request, Response} from 'express';
import ExerciseService from '../../../../services/exercise/';

export default async (req: Request, res: Response) => {
  try {
    const exercisesWithSignedUrls = await ExerciseService.getExercises();
    return res.status(200).json(exercisesWithSignedUrls);
  } catch (err: any) {
    return res.status(500).json({message: `Error retriving exercise data: ${err.message}`});
  }
};
