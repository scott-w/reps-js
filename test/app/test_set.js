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

import {UserModel} from '../../app/base/models/auth';
import {SetModel} from '../../app/sets/models/set';

import {SetList} from '../../app/sets/collections/sets';

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

      const localId = `sets.Set-${model.id}`;
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

    global.localStorage.setItem('sets.Set', 'abc');
    global.localStorage.setItem('sets.Set-abc', JSON.stringify({
      exercise_name: 'Squats',
      weight: '120kg',
      reps: 6
    }));
    global.localStorage.setItem('LocalData', 'sets.Set');
    global.localStorage.setItem('LocalData-sets.Set', JSON.stringify({
      modelname: 'sets.Set',
      data: ['abc']
    }));

    collection.fetchStored();
  });

  it('clears all localStorage including lost references', function(done) {
    collection = new SetList(null);
    const set = {exercise_name: 'Curls', weight: '10kg', reps: 15};
    collection.add(set);
    collection.add(set);

    collection.at(0).save();
    const id = collection.at(0).id;

    global.localStorage.setItem('LocalData', 'sets.Set');
    global.localStorage.setItem('LocalData-sets.Set', JSON.stringify({
      modelname: 'sets.Set',
      data: [id]
    }));

    collection.once('clear', function() {
      expect(collection.length).to.equal(0);

      const localModel = global.localStorage.getItem(`sets.Set-${id}`);
      const localData = global.localStorage.getItem('LocalData-sets.Set');
      const user = global.localStorage.getItem('UserModel-current');

      expect(localModel).to.equal(null);
      expect(localData).to.equal(null);
      expect(user).to.not.equal(null);

      done();
    });
    collection.clearStored();
  });

  it('orders with the newest workouts first, then by created date', (done) => {
    collection = new SetList([
      {
        id: 1,
        workout_date: '2016-01-02',
        reps: 3,
        weight: '60kg',
        createdAt: '2016-01-02T15:00:01'
      },
      {
        id: 2,
        workout_date: '2016-01-02',
        reps: 6,
        weight: '50kg',
        createdAt: '2016-01-02T14:00:00'
      },
      {
        id: 3,
        workout_date: '2016-01-05',
        reps: 5,
        weight: '70kg',
        createdAt: '2016-01-05'
      }
    ]);

    const first = collection.at(0);
    const second = collection.at(1);
    const third = collection.at(2);

    expect(first.get('weight')).to.equal('70kg');
    expect(first.id).to.equal(3);

    expect(second.get('weight')).to.equal('50kg');
    expect(second.id).to.equal(2);

    expect(third.get('weight')).to.equal('60kg');
    expect(third.id).to.equal(1);

    done();
  });

});
