import { Request, Response } from "express";
import Exercise from "../../../../interfaces/Exercise";
import ExerciseService from "../../../../services/exercise";
import ErrorSender from "../../../../utils/senders/ErrorSender";
import InvalidStructure from "../../../../errors/classes/InvalidStructure";

export default async (req: Request, res: Response) => {
  try {
    if (typeof req.params.name !== "string" || req.params.name.trim() === "") {
      throw new InvalidStructure("name parameter is invalid!");
    }

    const { name } = req.params;

    const exercise: Exercise = {
      name,
      primaryMuscles: req.body.primaryMuscles.split(","),
      secondaryMuscles: req.body.secondaryMuscles.split(","),
      type: req.body.type,
      met: req.body.met,
      equipment: req.body.equipment,
    };

    const updatedExercise = await ExerciseService.updateExerciseMetadata(
      exercise
    );

    return res.status(200).json(updatedExercise);
  } catch (err: any) {
    ErrorSender.sendError(res, err);
  }
};
