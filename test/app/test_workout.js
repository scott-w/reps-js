const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {spy, stub} from 'sinon';

import {WorkoutModel} from '../../app/workouts/models/workout';


describe('Workout Model', function () {
  var model;

  beforeEach(function (done) {
    model = new WorkoutModel({
      workout_date: '2016-02-20',
      location: null,
      sets: [
      {
        id: 4,
        weight: "85Kg",
        reps: 6,
        createdAt: "2016-02-20T16:04:03.409Z",
        updatedAt: "2016-02-20T16:04:03.409Z",
        exercise: 1,
        exercise_name: 'Bench Press'
      },
      {
        id: 6,
        weight: "18Kg",
        reps: 8,
        createdAt: "2016-02-20T16:04:03.411Z",
        updatedAt: "2016-02-20T16:04:03.411Z",
        exercise: 3,
        exercise_name: 'Flies'
      },
      {
        id: 3,
        weight: "80Kg",
        reps: 6,
        createdAt: "2016-02-20T16:04:03.407Z",
        updatedAt: "2016-02-20T16:04:03.407Z",
        exercise: 1,
        exercise_name: 'Bench Press'
      }]
    });

    spy(model, 'trigger');
    stub(model, 'sync');

    done();
  });

  afterEach(function(done) {
    model.trigger.restore();
    model.sync.restore();

    model = null;
    done();
  });

  it('gives a list of exercises with mapped sets', function(done) {
    const exercises = model.getExercises();
    expect(exercises.length).to.equal(2);

    const bench = exercises[0];
    const flies = exercises[1];

    expect(bench.get('exercise_name')).to.equal('Bench Press');
    expect(bench.get('sets').length).to.equal(2);
    expect(bench.get('sets')[0].id).to.equal(3);
    expect(bench.get('sets')[1].id).to.equal(4);

    expect(flies.get('exercise_name')).to.equal('Flies');
    expect(flies.get('sets').length).to.equal(1);
    expect(flies.get('sets')[0].id).to.equal(6);

    done();
  });

  it('saves using a PUT to the workout_date', function(done) {
    model.saveWorkout();

    const syncCall = model.sync.getCall(0);

    expect(syncCall.args[0]).to.equal('update');

    syncCall.args[2].success();
    expect(model.trigger.calledWith('save')).to.equal(true);

    done();
  });
});
