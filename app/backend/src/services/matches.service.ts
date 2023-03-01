import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/IResponse';
import { grResponse } from '../utils/grResponse';
import Matche from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';

class MatcheService {
  private _model: ModelStatic<Matche> = Matche;

  async getAll(inProgress: string): Promise<IResponse> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (!inProgress) return grResponse(200, matches);

    const isTrue = (inProgress === 'true');
    if (isTrue) return grResponse(200, matches.filter((e) => e.inProgress));

    const isFalse = (inProgress === 'false');
    if (isFalse) return grResponse(200, matches.filter((e) => !e.inProgress));

    return grResponse(200, matches);
  }

  async finished(id: number): Promise<IResponse> {
    await this._model.update({ inProgress: false }, { where: { id } });
    return grResponse(200, { message: 'Finished' });
  }
}

export default MatcheService;
