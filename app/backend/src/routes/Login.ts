import { Router } from 'express';
import UserController from '../controllers/User';
import LoginValidation from '../middlewares/loginValidation';
import TokenValidation from '../auth/tokenValidation';

const router = Router();

router.post('/', LoginValidation.validate, UserController.login);
router.get('/role', TokenValidation.validate, UserController.userRole);

export default router;
