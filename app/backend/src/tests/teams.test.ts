import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);
const { expect } = chai;

const teamsMock = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' },
  { id: 7, teamName: 'Flamengo' },
  { id: 8, teamName: 'Grêmio' },
  { id: 9, teamName: 'Internacional' },
  { id: 10, teamName: 'Minas Brasília' },
  { id: 11, teamName: 'Napoli-SC' },
  { id: 12, teamName: 'Palmeiras' },
  { id: 13, teamName: 'Real Brasília' },
  { id: 14, teamName: 'Santos' },
  { id: 15, teamName: 'São José-SP' },
  { id: 16, teamName: 'São Paulo' },
];

describe('Tests whether the GET /teams endpoint', () => {
  it('returns all teams', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });

  afterEach(() => {
    sinon.restore();
  });
});

describe('Tests whether the GET /teams/:id endpoint', () => {
  it('returns a specific team', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team);
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock[0]);
  });

  it('returns a 404 error when the team is not found', async () => {
    sinon.stub(Team, 'findByPk').resolves(null);
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ error: 'Team not found' });
  });

  afterEach(() => {
    sinon.restore();
  });
});