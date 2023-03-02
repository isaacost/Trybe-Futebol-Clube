import { IRouter, Router } from 'express';
import teamRoutes from './teams.route';
import userRoutes from './user.route';
import matcheRoutes from './matches.route';
import leaderboardRoutes from './leaderboard.route';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(userRoutes);
router.use(matcheRoutes);
router.use(leaderboardRoutes);

export default router;
