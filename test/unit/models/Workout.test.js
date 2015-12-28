var assert = require('assert'),
  moment = require('moment');

describe('WorkoutsModel', function() {

  describe('#listForUser()', function() {

    it('returns a query that lists workouts for a given user', function(done) {
      Workout.listForUser(1).exec(function(err, workouts) {
        if (err) done(err);
        _.each(workouts, function(item) {
          assert.equal(item.user, 1);
        });

        done();
      });
    });

  });


  describe('#createWithSets()', function() {

    it('will create a workout with attached sets', function (done) {
      Workout.createWithSets({
        workout_date: '24/10/2015',
        user: 1,
        location: 1,
        sets: [
          {reps: 1, weight: '15kg', exercise: 1}
        ]
      }, function(err, created) {
        assert.equal(err, null);
        assert.equal(created.sets.length, 1);
        assert.equal(
          moment.utc(created.workout_date).format('DD/MM/YYYY'),
          moment.utc('2015-10-24').format('DD/MM/YYYY')
        );
        done();
      });
    });

    it('will create a workout with no attached sets', function(done) {
      Workout.createWithSets({
        workout_date: '24/10/2015',
        user: 1,
        location: 1,
        sets: []
      }, function(err, created) {
        assert.equal(err, null);
        assert.equal(created.sets.length, 0, 'Empty list had sets');
        assert.equal(
          moment.utc(created.workout_date).format('DD/MM/YYYY'),
          moment.utc('2015-10-24').format('DD/MM/YYYY')
        );

        done();
      });
    });

    it('will create a workout with undefined sets', function(done) {
      Workout.createWithSets({
        workout_date: '24/10/2015',
        user: 1,
        location: 1
      }, function(err, created) {
        assert.equal(err, null);
        assert.equal(created.sets.length, 0, 'Undefined had sets');
        assert.equal(
          moment.utc(created.workout_date).format('DD/MM/YYYY'),
          moment.utc('2015-10-24').format('DD/MM/YYYY')
        );

        done();
      });
    });

    it('cannot save without a user and date', function(done) {
      Workout.createWithSets({
        location: 1
      }, function(err, created) {
        assert.notEqual(err, null);
        done();
      });
    });

  });

});
