import { Request, Response } from "express";
import InvalidStructure from "../../../../errors/classes/InvalidStructure";
import ErrorSender from "../../../../utils/senders/ErrorSender";
import ExerciseService from "../../../../services/exercise";

export default async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (typeof name !== "string" || name.trim() === "") {
      throw new InvalidStructure("Invalid parameter name!");
    }

    await ExerciseService.removeExercise(name);
    res
      .status(200)
      .json({ message: `Exercise with name [${name}] successfully removed!` });
  } catch (err: any) {
    ErrorSender.sendError(res, err);
  }
};
