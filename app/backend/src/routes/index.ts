import { Router } from 'express';
import TeamRouter from './Team';
import LoginRouter from './Login';
import MatchRouter from './Match';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchRouter);

export default router;
