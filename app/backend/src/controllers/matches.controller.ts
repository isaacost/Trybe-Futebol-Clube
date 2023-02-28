import { Request, Response, NextFunction } from 'express';
import MatcheService from '../services/matches.service';

class MatcheController {
  private _service: MatcheService = new MatcheService();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const { status, message } = await this._service.get(inProgress as string);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}

export default MatcheController;
