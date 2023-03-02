import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint /teams', () => {

  const TeamsList = [
    new TeamModel({
      id: 1,
      teamName: 'Avaí/Kindermann'
    }),
    new TeamModel({
      id: 2,
      teamName: 'Bahia'
    }),
    new TeamModel({
      id: 3,
      teamName: 'Botafogo'
    }),
  ]

  const TeamsControl = [
    {
      id: 1,
      teamName: 'Avaí/Kindermann'
    },
    {
      id: 2,
      teamName: 'Bahia'
    },
    {
      id: 3,
      teamName: 'Botafogo'
    }
  ]

  it('testa get teams', async () => {
   sinon.stub(Model, 'findAll').resolves(TeamsList);

    const result = await chai.request(app).get('/teams'); 
    
    expect(result.status).to.be.eq(200);
    expect(result.body).to.be.an('array');
    expect(result.body).to.deep.eq(TeamsControl);
  });
  
  it('testa get teams/:id', async () => {
    sinon.restore();
    sinon.stub(Model, 'findByPk').resolves(TeamsList[0]);

    const result = await chai.request(app).get('/teams/1'); 
  
  expect(result.status).to.be.eq(200);
  expect(result.body).to.deep.eq(TeamsControl[0]);
  
  })
});
