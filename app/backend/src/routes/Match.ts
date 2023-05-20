import { Router } from 'express';
import TokenValidation from '../auth/tokenValidation';
import MatchController from '../controllers/Match';
import MatchValidation from '../middlewares/matchValidation';

const router = Router();

router.get('/', MatchController.getAll);
router.post('/', TokenValidation.validate, MatchValidation.validate, MatchController.create);
router.patch('/:id', TokenValidation.validate, MatchController.updateMatch);
router.patch('/:id/finish', TokenValidation.validate, MatchController.finishMatch);

export default router;
