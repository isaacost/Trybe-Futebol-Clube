import { Request, Response, NextFunction } from 'express';
import MatcheService from '../services/matches.service';

class MatcheController {
  private _service: MatcheService = new MatcheService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const { status, message } = await this._service.getAll(inProgress as string);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async finished(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this._service.finished(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this._service.update(Number(id), req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this._service.create(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}

export default MatcheController;
