import {Request, Response} from 'express';
import DDB from '../../../../model/data/aws/DynamoDB';

export default async (req: Request, res: Response) => {
  console.log('INSIDE OF USER EXISTS');

  if (!req.query.email) {
    return res.status(400).json({message: 'Invalid request'});
  }
  if (typeof req.query.email !== 'string') {
    return res.status(400).json({message: 'Invalid email format'});
  }
  try {
    const exists = await DDB.emailExists(req.query.email);

    if (exists) {
      return res.status(200).json({message: `User exists`});
    } else {
      return res.status(404).json({message: `User does not exist`});
    }
  } catch (err: any) {
    return res
        .status(500)
        .json({message: `Error checking existence of user: ${err.message}`});
  }
};
