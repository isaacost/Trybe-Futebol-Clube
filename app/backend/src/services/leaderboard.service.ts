import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/IResponse';
import { grResponse } from '../utils/grResponse';
import Matche from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';
import ILeaderboard from '../interfaces/ILeaderboard';

const count = (string: string, arr: string[]) => {
  let soma = 0;
  arr.forEach((e) => {
    if (e === string) soma += 1;
  });
  return soma;
};

const grResults = (matches: Matche[]) =>
  matches.map((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) return 'victory';
    if (e.homeTeamGoals === e.awayTeamGoals) return 'draw';
    return 'lose';
  }) as string[];

const rank = (e: Team, results: string[], matchesByTeam: Matche[]) => {
  const goalsFavor = matchesByTeam.reduce((a, c) => a + c.homeTeamGoals, 0);
  const goalsOwn = matchesByTeam.reduce((a, c) => a + c.awayTeamGoals, 0);

  return {
    name: e.teamName,
    totalPoints: count('victory', results) * 3 + count('draw', results),
    totalGames: results.length,
    totalVictories: count('victory', results),
    totalDraws: count('draw', results),
    totalLosses: count('lose', results),
    goalsFavor,
    goalsOwn,
  };
};

class LeaderboardService {
  private _matche: ModelStatic<Matche> = Matche;
  private _team: ModelStatic<Team> = Team;

  async rankHome(): Promise<IResponse> {
    const teams = await this._team.findAll();
    const matches = await this._matche.findAll({ where: { inProgress: false } });

    const result: ILeaderboard[] = [];

    teams.forEach((e) => {
      const matchesByTeam = matches.filter((el) => el.homeTeamId === e.id);
      const results = grResults(matchesByTeam);

      result.push(rank(e, results, matchesByTeam));
    });
    return grResponse(200, result);
  }
}

export default LeaderboardService;
