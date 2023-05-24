import { Router } from 'express';
import TeamRouter from './Team';
import LoginRouter from './Login';
import MatchRouter from './Match';
import LeaderboardRouter from './Leaderboard';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
