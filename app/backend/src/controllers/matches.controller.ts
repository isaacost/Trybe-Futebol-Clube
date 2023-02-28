import { Request, Response, NextFunction } from 'express';
import MatcheService from '../services/matches.service';

class MatcheController {
  private _service: MatcheService = new MatcheService();

  async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this._service.get();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}

export default MatcheController;
