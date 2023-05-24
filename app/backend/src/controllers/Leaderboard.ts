import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  static async getAllLeaderBoard(_req: Request, res: Response): Promise<void> {
    const leaderboard = await LeaderboardService.getAllLeaderboard();
    res.status(200).json(leaderboard[0]);
  }

  static async getHomeLeaderboard(_req: Request, res: Response): Promise<void> {
    const homeLeaderboard = await LeaderboardService.getHomeLeaderboard();
    res.status(200).json(homeLeaderboard[0]);
  }

  static async getAwayLeaderboard(_req: Request, res: Response): Promise<void> {
    const awayLeaderboard = await LeaderboardService.getAwayLeaderboard();
    res.status(200).json(awayLeaderboard[0]);
  }
}
