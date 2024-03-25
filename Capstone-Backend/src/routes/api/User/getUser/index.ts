import { Request, Response } from "express";
import UserService from "../../../../services/user";
import ErrorSender from "../../../../utils/senders/ErrorSender";

export default async (req: Request, res: Response) => {
  console.log('INSIDE OF GET USER');
  try {
    const user = await UserService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (err: any) {
    ErrorSender.sendError(res, err);
  }
};
