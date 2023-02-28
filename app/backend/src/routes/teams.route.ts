import { Request, Response, Router } from 'express';
import TeamController from '../controllers/teams.controller';

export default class TeamRoute {
  public route: Router;
  private _controller: TeamController = new TeamController();

  constructor() {
    this.route = Router();
    this._init();
  }

  private _init(): void {
    this.route.get('/', (req: Request, res: Response) => {
      this._controller.findAll(req, res);
    });
  }
}
