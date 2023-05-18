import { Request, Response, NextFunction } from 'express';
import HttpErrorGenerator from '../helpers/httpErrorGenerator';

export default class ErrorHandler {
  static handleError(err: HttpErrorGenerator, _req: Request, res: Response, _next: NextFunction) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
