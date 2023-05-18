import { Request, Response } from 'express';
import TeamService from '../services/Team';

export default class TeamController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    const teams = await TeamService.getAll();
    res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await TeamService.getById(Number(id));
    res.status(200).json(team);
  }
}
