import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
  private _service: UserService = new UserService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this._service.login(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
