import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';

export default class TokenValidation {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
      const isValid = verifyToken(authorization);
      res.locals.user = isValid;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
