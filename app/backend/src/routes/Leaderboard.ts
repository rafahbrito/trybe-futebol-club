import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard';

const router = Router();

// router.get('/', LeaderboardController.getLeaderboard);

router.get('/home', LeaderboardController.getHomeLeaderboard);

router.get('/away', LeaderboardController.getAwayLeaderboard);

export default router;
