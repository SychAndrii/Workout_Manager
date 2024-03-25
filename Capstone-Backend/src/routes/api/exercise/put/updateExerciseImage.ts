import { Request, Response } from "express";
import ExerciseService from "../../../../services/exercise";
import ErrorSender from "../../../../utils/senders/ErrorSender";
import InvalidStructure from "../../../../errors/classes/InvalidStructure";

export default async (req: Request, res: Response) => {
  try {
    if (typeof req.params.name !== "string" || req.params.name.trim() === "") {
      throw new InvalidStructure("name parameter is invalid!");
    }

    const { name } = req.params;

    const updatedExercise = await ExerciseService.updateExerciseImage(
      name,
      req.body
    );

    return res.status(200).json(updatedExercise);
  } catch (err: any) {
    ErrorSender.sendError(res, err);
  }
};
