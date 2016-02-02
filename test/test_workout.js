'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

const Fixtures = require('sequelize-fixtures');

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const before = lab.before;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

var models = require('../models');


describe('Workout list', () => {
  before((done) => {
    Fixtures.loadFile('./fixtures/workouts.yaml', models).then(() => {
      done();
    });
  });

  it('returns a list of workouts from the database', (done) => {
    models.User.findAll({
      attributes: ['email']
    }).then((results) => {
      expect(results.length).to.equal(1);
      done();
    });
  });
});
