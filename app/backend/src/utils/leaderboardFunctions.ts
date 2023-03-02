import ILeaderboard from '../interfaces/ILeaderboard';
import Matche from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';

const count = (string: string, arr: string[]) => {
  let soma = 0;
  arr.forEach((e) => {
    if (e === string) soma += 1;
  });
  return soma;
};

const grResults = (matches: Matche[], t: string[]) => {
  const key1 = `${t[0]}` as ('awayTeamGoals' | 'homeTeamGoals');
  const key2 = `${t[1]}` as ('awayTeamGoals' | 'homeTeamGoals');
  return matches.map((e) => {
    if (e[key1] > e[key2]) return 'v';
    if (e[key1] === e[key2]) return 'd';
    return 'l';
  }) as string[];
};

const rank = (e: Team, results: string[], matchesByTeam: Matche[], t: string[]) => {
  const key1 = `${t[0]}` as ('awayTeamGoals' | 'homeTeamGoals');
  const key2 = `${t[1]}` as ('awayTeamGoals' | 'homeTeamGoals');

  const goalsFavor = matchesByTeam.reduce((a, c) => a + c[`${key1}`], 0);
  const goalsOwn = matchesByTeam.reduce((a, c) => a + c[`${key2}`], 0);

  const points = count('v', results) * 3 + count('d', results);
  const efficiency = ((points / (results.length * 3)) * 100).toFixed(2);

  return {
    name: e.teamName,
    totalPoints: count('v', results) * 3 + count('d', results),
    totalGames: results.length,
    totalVictories: count('v', results),
    totalDraws: count('d', results),
    totalLosses: count('l', results),
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(efficiency),
  };
};

const grResultsGeneral = (id: number, matches: Matche[]) =>
  matches.map((e) => {
    const team1 = e.awayTeamId === id ? 'awayTeamGoals' : 'homeTeamGoals';
    const team2 = team1 === 'awayTeamGoals' ? 'homeTeamGoals' : 'awayTeamGoals';

    if (e[team1] > e[team2]) return 'v';
    if (e[team1] === e[team2]) return 'd';
    return 'l';
  }) as string[];

const getGoals = (e: Team, matchesByTeam: Matche[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matchesByTeam.forEach((el) => {
    const team1 = el.awayTeamId === e.id ? 'awayTeamGoals' : 'homeTeamGoals';
    const team2 = team1 === 'awayTeamGoals' ? 'homeTeamGoals' : 'awayTeamGoals';

    goalsFavor += el[team1];
    goalsOwn += el[team2];
  });

  return { goalsFavor, goalsOwn };
};

const rankGeneral = (e: Team, results: string[], matchesByTeam: Matche[]) => {
  const { goalsFavor, goalsOwn } = getGoals(e, matchesByTeam);
  const points = count('v', results) * 3 + count('d', results);
  const efficiency = ((points / (results.length * 3)) * 100).toFixed(2);
  return {
    name: e.teamName,
    totalPoints: count('v', results) * 3 + count('d', results),
    totalGames: results.length,
    totalVictories: count('v', results),
    totalDraws: count('d', results),
    totalLosses: count('l', results),
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(efficiency),
  };
};

const teste = (n1: number, n2: number) => {
  if (n1 > n2) return 1;
  return -1;
};

const orderRank = (arr: ILeaderboard[]) => {
  arr.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return teste(b.totalPoints, a.totalPoints);
    if (b.totalVictories !== a.totalVictories) return teste(b.totalVictories, a.totalVictories);
    if (b.goalsBalance !== a.goalsBalance) return teste(b.goalsBalance, a.goalsBalance);
    if (b.goalsFavor !== a.goalsFavor) return teste(b.goalsFavor, a.goalsFavor);
    return teste(b.goalsOwn, a.goalsOwn);
  });
  return arr;
};

export { rank, grResults, orderRank, grResultsGeneral, rankGeneral };
