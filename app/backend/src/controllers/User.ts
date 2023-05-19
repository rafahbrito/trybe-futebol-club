import { Request, Response } from 'express';
import UserService from '../services/User';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any | unknown) {
      res.status(error.status).json({ message: error.message });
    }
  }

  static async userRole(_req: Request, res: Response): Promise<void> {
    const { email } = res.locals.user;
    const role = await UserService.userRole(email);
    res.status(200).json({ role });
  }
}
