import { Request, Response, NextFunction } from 'express';
import HttpErrorGenerator from '../helpers/httpErrorGenerator';

export default class MatchValidation {
  static validate(req: Request, _res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    const message = 'It is not possible to create a match with two equal teams';
    if (homeTeamId === awayTeamId) throw new HttpErrorGenerator(422, message);
    next();
  }
}
