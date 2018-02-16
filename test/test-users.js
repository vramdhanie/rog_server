'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { app, runServer, closeServer } = require('../server');
const TEST_DATABASE_URL = 'mongodb://localhost/test_rog';
const TEST_PORT = 8000;

const { User } = require('../users');

describe('User Router', () => {

  before(() => runServer(TEST_DATABASE_URL, TEST_PORT));
  after(() => closeServer());
  beforeEach(()=>{});
  afterEach(() => User.remove({}));


  it('should create a new user', () => {
    expect(1).to.equal(1);
  })
});
