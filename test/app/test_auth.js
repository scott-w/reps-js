const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {spy} from 'sinon';

import {UserModel} from '../../app/base/models/auth';


describe('UserModel', function() {
  var model;

  beforeEach(function(done) {
    model = new UserModel();
    done();
  });

  afterEach(function(done) {
    model.clear();
    done();
  });

  it('marks the user as not logged in when token is empty', (done) => {
    expect(model.isLoggedIn()).to.equal(false);
    done();
  });

  it('marks the user as logged in when token is set', (done) => {
    model.save({token: 'abc'});
    expect(model.isLoggedIn()).to.equal(true);
    done();
  });

  it('can log users out', (done) => {
    spy(model, 'trigger');

    model.save({token: 'abc'});

    model.logout();

    expect(model.trigger.calledWith('logout')).to.equal(true);
    expect(model.isLoggedIn()).to.equal(false);

    const storedUser = JSON.parse(
      global.localStorage.getItem('UserModel-current'));
    expect(storedUser.token).to.equal('');
    done();
  });
});
