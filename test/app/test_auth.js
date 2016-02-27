const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

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
});
