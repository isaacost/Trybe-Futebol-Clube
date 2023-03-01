import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matche from '../database/models/MatcheModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint /matches', () => {
  beforeEach(sinon.restore);

  const matcheList = [
    new Matche({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true
    }),
    new Matche({
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 7,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: false
    }),
  ]

  const matcheListControl = [
    {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 3,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true
    },
    {
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 7,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: false
    }
  ]

  it('Testa get', async () => {
    sinon.stub(Model, 'findAll').resolves(matcheList);

    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(matcheListControl);
  });

  it('Testa get com inProgress true', async () => {
    sinon.stub(Model, 'findAll').resolves(matcheList);

    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matcheListControl[0]]);
  });

  it('Testa get com inProgress false', async () => {
    sinon.stub(Model, 'findAll').resolves(matcheList);

    const result = await chai.request(app).get('/matches?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matcheListControl[1]]);
  });

  it('Testa finish sem token', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai.request(app).patch('/matches/1/finish');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Testa finish com token invalido', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai.request(app).patch('/matches/1/finish').set('Authorization','is4');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

//   it('Testa finish com token valido', async () => {
//     sinon.stub(Model, 'update').resolves();

//     const result = await chai.request(app).patch('/matches/1/finish').set('Authorization','(colocar o token aqui)');

//     expect(result.status).to.be.equal(200);
//     expect(result.body).to.deep.equal({ message: 'Finished' });
//   });

});