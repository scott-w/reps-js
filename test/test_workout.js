'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

const Code = require('code');
const Lab = require('lab');
const Shot = require('shot');

const lab = exports.lab = Lab.script();

const before = lab.before;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

var construct = require('./construct');
var models = require('../models');
var server = require('../app.js');

const headers = {
  Authorization: 'Bearer ' +
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20' +
    'iLCJzY29wZSI6WyJhbGwiXSwiaWQiOjcsImlhdCI6MTQ1NDc1NTU3MH0.EzQTjkaQ0SfT5_8' +
    'SxuYAW9pVg9ZbWUrMEfOI79T0YZQ'
};


describe('Workout list', () => {
  beforeEach((done) => {
    construct.fixtures('./fixtures/workouts.yaml', done);
  });

  it('retrieves a list of workouts from the API', (done) => {
    const reqData = {
      method: 'get',
      url: '/workouts/',
      headers: headers
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(
        response.headers['content-type'].split(';')[0]
      ).to.equal('application/json');
      expect(response.result.length).to.equal(1);
      expect(response.result[0].workout_date).to.equal('2016-01-10');

      done();
    });
  });

  it('retrieves a workout from a given URL', (done) => {
    const reqData = {
      method: 'get',
      url: '/workouts/1',
      headers: headers
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(
        response.headers['content-type'].split(';')[0]
      ).to.equal('application/json');

      expect(response.result.workout_date).to.equal('2016-01-10');
      expect(response.result.Location.name).to.equal('Test Location');

      done();
    });
  });

  it('does not allow a user to view another user\'s workouts', (done) => {
    const reqData = {
      method: 'get',
      url: '/workouts/2',
      headers: headers
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(404);

      done();
    });
  });
});

describe('Create workout', () => {
  beforeEach((done) => {
    construct.fixtures('./fixtures/workouts.yaml', done);
  });

  it('can create a workout assigned to the user', (done) => {
    const reqData = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-20',
        location: 1
      }
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.workout_date).to.equal('2016-01-20');
      expect(response.result.location.name).to.equal('Test Location');

      done();
    });
  });

  it('cannot duplicate a workout date for a user', (done) => {
    const reqData = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-10',
        location: 1
      }
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(400);

      done();
    });
  });

  it('can duplicate the date across different users', (done) => {
    const reqData = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-06',
        location: 1
      }
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.workout_date).to.equal('2016-01-06');
      expect(response.result.location.name).to.equal('Test Location');

      done();
    });
  });

});
