import { Router } from 'express';
import TeamRouter from './Team';
import LoginRouter from './Login';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);

export default router;
