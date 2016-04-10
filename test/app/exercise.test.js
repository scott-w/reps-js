import _ from 'underscore';
import Backbone from 'backbone';
import expect from 'expect.js';

import {ExerciseModel} from '../../app/exercises/models/exercise';


describe('Exercise Model', function () {
  let exercise;

  beforeEach(function() {
    const sets = _.chain(_.range(11).map(() => ({
      weight: '15kg',
      reps: 6,
      exercise_name: 'Test',
      workout_date: '2016-01-01'
    }))).value();

    sets.push({
      weight: '15kg',
      reps: 6,
      exercise_name: 'Test',
      workout_date: '2016-01-05'
    });

    exercise = new ExerciseModel({
      exercise_name: 'Test',
      sets: sets
    });
  });

  afterEach(function() {
    exercise = null;
  });

  it('returns a truncated set list', function() {
    const sets = exercise.getSetSummary(Backbone.Collection);
    expect(sets.length).to.equal(10);

    sets.each((set) => {
      expect(set.get('exercise_name')).to.equal('Test');
      expect(set.get('reps')).to.equal(6);
    });
  });

  it('returns the most recent exercise', function() {
    const recent = exercise.getLastExercise();

    expect(recent.length).to.equal(1);
    _.each(recent, (set) => expect(set.workout_date).to.equal('2016-01-05'));
  });
});
