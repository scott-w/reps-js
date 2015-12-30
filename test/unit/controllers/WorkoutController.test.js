var Barrels = require('barrels');
var assert = require('assert');
var request = require('supertest');
var moment = require('moment');

describe('WorkoutsController', function() {
  var auth, client;

  beforeEach(function() {
    client = request.agent(sails.hooks.http.app);
    auth = client.post('/auth/login').field(
      'email', 'test@example.com').field('password', 'password'
    );
  });

  afterEach(function() {
    client = auth = null;
  });


  describe('#list', function() {

    it('returns an empty list', function(done) {
      auth.end(function(authErr, authRes) {

        if (authErr) done(authErr);

        client.get('/workout/').expect(200).end(function(err, res) {
          if (err) return done(err);

          assert.ok(_.isArray(res.body));
          assert.equal(res.body.length, 2, 'Response body not empty');
          _.each(res.body, function(workout) {
            assert.equal(workout.user, 1);
          });
          done();
        });
      });
    });

  });

  describe('#create', function() {
    it('creates a workout', function(done) {
      auth.end(function() {
        client.post('/workout/').send({
          workout_date: '10/10/2015',
          location: 1,
          sets: []
        }).expect(201).expect(
          'Content-type', /json/
        ).end(function(err, res) {
          if (err) return done(err);

          assert.equal(
            moment.utc(res.body.workout_date).format('DD/MM/YYYY'), '10/10/2015'
          );
          done();
        });
      });
    });
  });
});
