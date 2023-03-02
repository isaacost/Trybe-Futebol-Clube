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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NzYzODg0LCJleHAiOjE2Nzg2Mjc4ODR9.e5GVmFHZ9ZWiZ5Lc7kMNhXZjEu_DqnuMMwjRotatThY";

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

  const createMatche = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const createMatcheErr = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: true,
  };

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

  it('Testa finish com token valido', async () => {
    sinon.stub(Model, 'update').resolves();
   
    const result = await chai.request(app).patch('/matches/1/finish').set({ Authorization: `${ token }`});

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Finished' });
  });

  it('Testa create do matche', async () => {
    sinon.stub(Model, 'create').resolves(matcheList[1]);

    const result = await chai.request(app).post('/matches').send(createMatche).set({ Authorization: `${ token }`});

    expect(result.status).to.be.equal(201);
    expect(result.body).to.deep.equal(matcheListControl[1]);
  });

});