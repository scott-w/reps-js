const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {spy, stub} from 'sinon';

import {UserModel} from '../../app/base/models/auth';


describe('UserModel', function() {
  var model;

  beforeEach(function(done) {
    model = new UserModel();

    spy(global.localStorage, 'clear');
    spy(model, 'trigger');
    spy(model, 'sync');

    done();
  });

  afterEach(function(done) {
    model.clear();
    global.localStorage.clear.restore();
    model.trigger.restore();
    model.sync.restore();

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
    model.save({token: 'abc'});

    model.logout();

    expect(model.trigger.calledWith('logout')).to.equal(true);
    expect(model.isLoggedIn()).to.equal(false);

    const storedUser = JSON.parse(
      global.localStorage.getItem('UserModel-current'));
    expect(storedUser.token).to.equal('');
    expect(global.localStorage.clear.called).to.equal(true);
    done();
  });

  it('can update the user', (done) => {
    model.updateUser({
      first_name: 'Test',
      last_name: 'User'
    });

    expect(model.get('first_name'), 'Test');
    expect(model.get('last_name'), 'User');

    const syncArgs = model.sync.getCall(1).args;

    expect(syncArgs[0]).to.equal('update');
    expect(syncArgs[1]).to.equal(model);
    expect(syncArgs[2].ajaxSync).to.equal(true);

    done();
  });
});

describe('User password', () => {
  let user;

  beforeEach((done) => {
    user = new UserModel();
    stub(user, 'sync');
    done();
  });

  afterEach((done) => {
    user.sync.restore();
    done();
  });

  it('can update the user\'s password', (done) => {
    user.changePassword('newpassword', 'newpassword');

    expect(user.isValid()).to.equal(true);
    expect(user.sync.calledWith('patch')).to.equal(true);

    done();
  });

  it('will not update if the passwords do not match', (done) => {
    user.changePassword('newpassword', 'differentpassword');

    expect(user.sync.calledWith('patch')).to.equal(false);

    done();

  })
});
