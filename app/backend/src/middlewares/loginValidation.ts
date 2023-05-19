import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import HttpErrorGenerator from '../helpers/httpErrorGenerator';
import loginSchema from '../joi/schema';

export default class LoginValidation {
  static errorHandler(error: ValidationError) {
    const { type } = error.details[0];
    switch (type) {
      case 'string.email':
        throw new HttpErrorGenerator(401, 'Invalid email or password');
      case 'string.min':
        throw new HttpErrorGenerator(401, 'Invalid email or password');
      default:
        throw new HttpErrorGenerator(400, 'All fields must be filled');
    }
  }

  static validate(req: Request, _res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    if (error) LoginValidation.errorHandler(error);
    next();
  }
}
