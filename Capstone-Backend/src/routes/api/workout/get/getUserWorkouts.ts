import { Request, Response } from "express";
import TypeValidator from "../../../../utils/other/TypeValidator";
import InvalidStructure from "../../../../errors/classes/InvalidStructure";
import ErrorSender from "../../../../utils/senders/ErrorSender";
import WorkoutService from "../../../../services/workout";

export default async (req: Request, res: Response) => {
  try {
    const { requestUsername, ownerUsername } = req.query;

    if (
      !TypeValidator.isNotEmptyString(requestUsername) ||
      !TypeValidator.isNotEmptyString(ownerUsername)
    ) {
      throw new InvalidStructure(
        `requestUsername and ownerUsername query parameters must be provided!`
      );
    }

    const foundWorkouts = await WorkoutService.getUserWorkouts(
      requestUsername as string,
      ownerUsername as string
    );
    res.json(foundWorkouts);
  } catch (error) {
    const err = error as Error;
    ErrorSender.sendError(res, err);
  }
};
