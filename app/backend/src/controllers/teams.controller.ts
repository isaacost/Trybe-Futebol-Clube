import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  private _service: TeamService = new TeamService();

  public async findAll(req: Request, res: Response): Promise<void> {
    const teams = await this._service.findAll();
    res.status(200).json(teams);
  }
}
