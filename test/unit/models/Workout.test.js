assert = require('assert'),

describe('WorkoutsModel', function() {

  describe('#createWithSets()', function() {

    it('will create a workout with attached sets', function (done) {
      Workout.createWithSets({
        workout_date: '24/20/2015',
        user: 1,
        location: 1,
        sets: [
          {reps: 1, weight: '15kg', exercise: 1}
        ]
      }, function(err, created) {
        assert.equal(err, null);
        assert.equal(created.sets.length, 1);
        done();
      });
    });

    it('will create a workout with no attached sets', function(done) {
      Workout.createWithSets({
        workout_date: '24/20/2015',
        user: 1,
        location: 1,
        sets: []
      }, function(err, created) {
        assert.equal(err, null);
        assert.equal(created.sets.length, 0);
        done();
      });
    });

    it('will create a workout with undefined sets', function(done) {
      Workout.createWithSets({
        workout_date: '24/20/2015',
        user: 1,
        location: 1
      }, function(err, created) {
        assert.equal(err, null);
        assert.equal(created.sets.length, 0);
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
