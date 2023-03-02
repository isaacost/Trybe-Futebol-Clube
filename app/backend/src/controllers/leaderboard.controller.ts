import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private _service: LeaderboardService = new LeaderboardService();

  async rankHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this._service.rankHome();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async rankAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this._service.rankAway();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async rank(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this._service.rankGeral();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
