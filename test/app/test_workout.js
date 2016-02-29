const _ = require('lodash');

const Code = require('code');
const Lab = require('lab');
const sinon = require('sinon');

const lab = exports.lab = Lab.script();

const after = lab.after;
const afterEach = lab.afterEach;
const before = lab.before;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {
  UserModel
} from '../../app/base/models/auth';
import {
  SetModel,
  WorkoutModel
} from '../../app/workouts/models/workout';
import {
  SetList
} from '../../app/workouts/collections/workouts';


describe('Set Model', () => {
  var xhr;
  var requests = [];
  const user = new UserModel();

  before(function (done) {
    user.save({
      token: 'test'
    });
    done();
  });

  after(function (done) {
    global.localStorage.clear();
    done();
  });

  beforeEach(function (done) {
    xhr = sinon.useFakeXMLHttpRequest();
    global.window.XMLHttpRequest = xhr;
    xhr.onCreate = function (req) {
      requests.push(req);
    };
    done();
  });

  afterEach(function (done) {
    xhr.restore();
    requests = [];
    xhr = null;
    done();
  });

  it('fetches individual workouts from the server', function (done) {
    const responseBody = {
      id: 4,
      exercise_name: 'Squat'
    };
    const headers = {
      'Content-type': 'application/json'
    };

    const set = new SetModel({
      exercise_name: 'Bench Press',
      reps: 6,
      weight: '60Kg'
    });

    set.once('sync:exercise', function (model, exercise) {
      expect(exercise)
        .to.equal(4);
      expect(set.get('exercise'))
        .to.equal(4);
      expect(model.get('exercise'))
        .to.equal(4);
      done();
    });

    set.fetchExercise();

    expect(requests.length)
      .to.equal(1);
    expect(requests[0].url)
      .to.equal('/exercises/');
    expect(
        requests[0].requestBody
      )
      .to.equal(
        JSON.stringify({
          exercise_name: 'Bench Press'
        })
      );
    expect(requests[0].method)
      .to.equal('PATCH');

    requests[0].respond(200, headers, JSON.stringify(responseBody));
  });

  it('validates reps is a number', (done) => {
    const set = new SetModel();
    set.set({
      reps: 'string',
      exercise_name: 'test',
      weight: '15kg'
    });

    expect(set.isValid()).to.equal(false);
    expect(set.validationError.reps.length).to.equal(1);
    expect(set.validationError.reps[0]).to.equal('Reps is not a number');
    done();
  });

  it('validates reps must be > 0', (done) => {
    const set = new SetModel();

    set.set({
      reps: '0',
      exercise_name: 'test',
      weight: '15kg'
    });

    expect(set.isValid()).to.equal(false);
    expect(set.validationError.reps.length).to.equal(1);
    expect(set.validationError.reps[0]).to.equal('Reps must be greater than 0');

    done();
  });
});

describe('Set List', () => {
  var collection;
  var xhr;
  var requests = [];
  const user = new UserModel();

  beforeEach(function (done) {
    global.localStorage.clear();

    user.save({
      token: 'test'
    });

    xhr = sinon.useFakeXMLHttpRequest();
    global.window.XMLHttpRequest = xhr;
    xhr.onCreate = function (req) {
      requests.push(req);
    };

    done();
  });

  afterEach(function (done) {
    collection = null;
    xhr.restore();
    requests = [];
    xhr = null;
    done();
  });

  it('assigns exercise IDs if it finds a matching exercise_name', (done) => {
    collection = new SetList([
      {
        exercise_name: 'Bench Press',
        reps: 1,
        weight: '80Kg'
      },
      {
        exercise_name: 'Bench Press',
        exercise: 2,
        reps: 3,
        weight: '70Kg'
      },
      {
        exercise_name: 'Squat',
        reps: 5,
        weight: '120Kg'
      }
    ]);

    collection.setExerciseIds();
    expect(collection.at(0)
        .get('exercise'))
      .to.equal(2);
    done();
  });

  it('fetches exercise IDs from the server if they exist', (done) => {
    collection = new SetList([
      {
        exercise_name: 'Bench Press',
        exercise: 2,
        reps: 3,
        weight: '70Kg'
      },
      {
        exercise_name: 'Squat',
        reps: 5,
        weight: '120Kg'
      }
    ]);

    const responseBody = {
      id: 4,
      exercise_name: 'Squat'
    };
    const headers = {
      'Content-type': 'application/json'
    };

    collection.once('sync', function () {
      expect(collection.at(1)
          .get('exercise'))
        .to.equal(4);
      done();
    });

    collection.fetchExerciseIds();

    expect(requests.length)
      .to.equal(1);
    expect(requests[0].url)
      .to.equal('/exercises/');
    expect(
        requests[0].requestBody
      )
      .to.equal(
        JSON.stringify({
          exercise_name: 'Squat'
        })
      );
    expect(requests[0].method)
      .to.equal('PATCH');

    requests[0].respond(200, headers, JSON.stringify(responseBody));
  });

  it('automatically stores its data in local storage', function(done) {
    collection = new SetList(null);

    collection.once('add', function(model, collection) {
      expect(collection.length).to.equal(1);

      expect(model.get('exercise_name')).to.equal('Curls');
      expect(model.get('weight')).to.equal('10kg');
      expect(model.get('reps')).to.equal(15);

      const localId = `workouts.Set-${model.id}`;
      const stored = JSON.parse(window.localStorage.getItem(localId));

      expect(stored.exercise_name).to.equal('Curls');
      expect(stored.weight).to.equal('10kg');
      expect(stored.reps).to.equal(15);
      done();
    });

    collection.addSet(new SetModel({
      exercise_name: 'Curls',
      weight: '10kg',
      reps: 15
    }));
  });

  it('retrieves data from the local storage', function(done) {
    collection = new SetList(null);

    collection.once('loaded', function() {
      expect(collection.length).to.equal(1);
      const model = collection.at(0);
      expect(model.get('exercise_name')).to.equal('Squats');
      expect(model.get('weight')).to.equal('120kg');
      expect(model.get('reps')).to.equal(6);
      done();
    });

    global.localStorage.setItem('workouts.Set', 'abc');
    global.localStorage.setItem('workouts.Set-abc', JSON.stringify({
      exercise_name: 'Squats',
      weight: '120kg',
      reps: 6
    }));
    global.localStorage.setItem('LocalData', 'workouts.Set');
    global.localStorage.setItem('LocalData-workouts.Set', JSON.stringify({
      modelname: 'workouts.Set',
      data: ['abc']
    }));

    collection.fetchStored();
  });

  it('clears all localStorage including lost references', function(done) {
    collection = new SetList(null);
    const set = {exercise_name: 'Curls', weight: '10kg', reps: 15};
    collection.add(set);

    collection.at(0).save();
    const id = collection.at(0).id;

    global.localStorage.setItem('LocalData', 'workouts.Set');
    global.localStorage.setItem('LocalData-workouts.Set', JSON.stringify({
      modelname: 'workouts.Set',
      data: [id]
    }));

    collection.once('clear', function() {
      expect(collection.length).to.equal(0);

      const localModel = global.localStorage.getItem(`workouts.Set-${id}`);
      const localData = global.localStorage.getItem('LocalData-workouts.Set');
      const user = global.localStorage.getItem('UserModel-current');

      expect(_.isUndefined(localModel)).to.equal(true);
      expect(_.isUndefined(localData)).to.equal(true);
      expect(_.isUndefined(user)).to.equal(false);
      done();
    });
    collection.clearStored();
  });
});


describe('Workout Model', function () {
  var model;

  beforeEach(function (done) {
    model = new WorkoutModel({
      id: 19,
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
    done();
  });

  it('gives a list of exercises with mapped sets', function (done) {
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
});
