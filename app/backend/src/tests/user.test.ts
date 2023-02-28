import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint /login', () => {

  beforeEach(sinon.restore);

  const userList = [
    new User({
      id: 7,
      username: 'Username',
      role: 'admin',
      email: 'email@email.com',
      password: 'password'
    })
  ]

  const userListControl = [
    {
      id: 7,
      username: 'Username',
      role: 'admin',
      email: 'email@email.com',
      password: 'password'
    }
  ]

  it('Testa user login', async () => {
    const body = { email: 'email@email.com', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.haveOwnProperty('token')

  });
});
