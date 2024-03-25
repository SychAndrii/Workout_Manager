import {Request, Response} from 'express';
import InvalidStructure from '../../../../errors/classes/InvalidStructure';
import ErrorSender from '../../../../utils/senders/ErrorSender';
import ExerciseService from '../../../../services/exercise';


export default async (req: Request, res: Response) => {
  try {
    if (typeof req.params.name !== 'string' || req.params.name.trim() === '') {
      throw new InvalidStructure("name parameter is invalid!");
    }
    const {name} = req.params;

    const exercise = await ExerciseService.getExercise(name);

    if (exercise === null) {
      res.status(404).json({message: `Exercise with name [${name}] not found!`});
    }
    else {
      res.json(exercise);
    }
  } catch (err: any) {
    ErrorSender.sendError(res, err);
  }
};
