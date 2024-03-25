// SECURE Health Check API
import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
  res.status(200).send(`Secure Health is good!`);
};
