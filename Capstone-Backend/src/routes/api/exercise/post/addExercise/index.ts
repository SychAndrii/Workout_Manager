import { Request, Response } from "express";
import Exercise, { ExerciseImage, ExerciseVideo } from "../../../../../interfaces/Exercise";
import ExerciseService from "../../../../../services/exercise";
import ErrorSender from "../../../../../utils/senders/ErrorSender";
import InvalidStructure from "../../../../../errors/classes/InvalidStructure";

export default async (req: Request, res: Response) => {
  try {
    const exercise: Exercise = {
      name: req.body.name,
      primaryMuscles: req.body.primaryMuscles.split(','),
      secondaryMuscles: req.body.secondaryMuscles.split(','),
      type: req.body.type,
      met: req.body.met,
      equipment: req.body.equipment,
    };

    const files = req.files;

    const receivedImage = files && 'image' in files ? files["image"][0] : undefined;
    if (!receivedImage) {
      throw new InvalidStructure('Image must be provided when creating an exercise!');
    }

    const image = {
      buffer: receivedImage.buffer,
      mimeType: receivedImage.mimetype
    } as ExerciseImage;

    const receivedVideo =
      files && 'video' in files ? files["video"][0] : undefined;

    const video = (receivedVideo ? {
      buffer: receivedVideo.buffer,
      mimeType: receivedVideo.mimetype
    } : undefined) as ExerciseVideo | undefined;

    const addedExercise = await ExerciseService.addExercise(exercise, image, video);
    return res.status(201).json(addedExercise);
  } catch (err: any) {
    ErrorSender.sendError(res, err);
  }
};
