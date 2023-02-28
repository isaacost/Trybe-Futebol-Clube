import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  private _model: ModelStatic<TeamModel> = TeamModel;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams as ITeam[];
  }

  public async getById(id: number): Promise<ITeam> {
    const teams = await this._model.findByPk(id);
    return teams as ITeam;
  }
}
