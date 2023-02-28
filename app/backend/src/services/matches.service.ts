import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/IResponse';
import { grResponse } from '../utils/grResponse';
import Matche from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';

class MatcheService {
  private _model: ModelStatic<Matche> = Matche;

  async get(): Promise<IResponse> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return grResponse(200, matches);
  }
}

export default MatcheService;
