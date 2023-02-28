import { IRouter, Router } from 'express';
import teamRoutes from './teams.route';
import userRoutes from './user.route';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(userRoutes);

export default router;
