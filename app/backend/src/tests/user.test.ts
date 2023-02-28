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

  it('Testa user login válido', async () => {
    const body = { email: 'email@email.com', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.haveOwnProperty('token')

  });

  it('Testa user login sem password', async () => {
    const body = { email: 'email@email.com', password: ''}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);
    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Testa user login sem email', async () => {
    const body = { email: '', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);
    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Testa user login com email invalido', async () => {
    const body = { email: 'email', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });


  it('Testa user login com password invalida', async () => {
    const body = { email: 'email@email.com', password: '123'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });
  it('Testa user login com email e password invalidas', async () => {
    const body = { email: 'email', password: '123'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });
});
