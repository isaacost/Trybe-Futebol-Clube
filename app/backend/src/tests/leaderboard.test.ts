import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matche from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint /leaderboard', () => {
  beforeEach(sinon.restore);

  const matcheList = [
    new Matche({
      id: 4,
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: false,
    }),
    new Matche({
      id: 10,
      homeTeamId: 2,
      awayTeamId: 9,
      homeTeamGoals: 0,
      awayTeamGoals: 2,
      inProgress: false,
    }),
  ];

  const teamList = [
    new Team({
      id: 2,
      teamName: 'Bahia',
    }),
  ];

  const returnResultHome = [
    {
        name: 'Bahia',
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 2,
        goalsBalance: -2,
        efficiency: 0
      },
  ];

  const returnResultAway = [
    {
      name: 'Bahia',
      totalPoints: 1,
      totalGames: 1,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 33.33
    },
  ];

  it('Testa get leaderboard home', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(teamList)
      .onSecondCall()
      .resolves(matcheList);

    const result = await chai.request(app).get('/leaderboard/home');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(returnResultHome);
  });

  it('Testa get leaderboard away', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(teamList)
      .onSecondCall()
      .resolves(matcheList);

    const result = await chai.request(app).get('/leaderboard/away');

    expect(result.status).to.be.equal(200);    
    expect(result.body).to.deep.equal(returnResultAway);
  });
});
