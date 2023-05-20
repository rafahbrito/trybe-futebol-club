import { Request, Response } from 'express';
import MatchService from '../services/Match';

export default class MatchController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const query = req.query.inProgress as string;
    const matches = query ? await MatchService.getInProgress(query) : await MatchService.getAll();
    res.status(200).json(matches);
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const createdMatch = await MatchService.create(req.body);
      res.status(201).json(createdMatch);
    } catch (error: any | unknown) {
      res.status(error.status).json({ message: error.message });
    }
  }

  static async updateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedMatch = await MatchService.updateMatch(Number(id), req.body);
    res.status(200).json(updatedMatch);
  }

  static async finishMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await MatchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }
}
