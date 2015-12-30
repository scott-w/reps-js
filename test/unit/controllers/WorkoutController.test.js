var Barrels = require('barrels');
var assert = require('assert');
var request = require('supertest');
var moment = require('moment');

describe('WorkoutsController', function() {
  describe('#list', function() {

    it('returns workouts for a user', function(done) {

      sails.request.get('/workout/').expect(200).end(function(err, res) {
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

  describe('#retrieve', function() {
    it('retrieves an individual workout', function(done) {

      sails.request.get('/workout/1').expect(200).end(function(err, res) {
        if (err) return done(err);

        assert.equal(res.body.id, 1);
        assert.equal(res.body.user, 1);
        assert.equal(res.body.sets.length, 2, 'Sets not retrieved');
        done();
      });
    });

    it('cannot retrieve a workout belonging to another user', function(done) {

      sails.request.get('/workout/3').expect(404).end(function(err, res) {
        if (err) return done(err);

        done();
      });
    });

  });

  describe('#create', function() {
    it('creates a workout', function(done) {
      sails.request.post('/workout/').send({
        workout_date: '10/10/2015',
        location: 1,
        sets: []
      }).expect(201).expect(
        'Content-type', /json/
      ).end(function(err, res) {
        if (err) return done(err);

        assert.equal(
          moment.utc(res.body.workout_date).format('DD/MM/YYYY'),
          '10/10/2015'
        );
        assert.equal(res.body.user, 1);
        done();
      });
    });
  });
});
