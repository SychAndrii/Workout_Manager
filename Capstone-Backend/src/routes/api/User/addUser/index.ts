import {Request, Response} from 'express';
import User from '../../../../model/user';

export default async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({message: 'Invalid request body'});
  }
  if (!req.body.email) {
    return res.status(400).json({message: 'Invalid email'});
  }
  if (!req.body.data) {
    return res.status(400).json({message: 'Invalid user data'});
  }
  try {
    const newUser = new User(req.body.email, req.body.data);
    await newUser.addUserData();

    return res.status(201).json({message: `User added to DynamoDB`});
  } catch (err: any) {
    return res
        .status(500)
        .json({message: `Error adding user: ${err.message}`});
  }
};
