import { Request, Response } from 'express';
import { MUSCLE } from '../../../../interfaces/Exercise/arrays';

export default (req: Request, res: Response) => {
  try {
    return res.status(200).json(MUSCLE);
  } catch (err: any) {
    return res.status(500).json({ message: `Error retriving all muscle: ${err.message}` });
  }
};
