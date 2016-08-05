/* jshint node: true */
/* jshint esversion: 6 */

const Code = require('code');
const Lab = require('lab');
const proxyquire = require('proxyquire');

const lab = exports.lab = Lab.script();

const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

const construct = require('./construct');
const server = require('../../app.js');

const headers = {
  Authorization: construct.authHeader
};

const models = require('../../models');

const _ = require('lodash');

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
      expect(response.result.length).to.equal(2);
      expect(response.result[0].workout_date).to.equal('2016-01-10');
      expect(response.result[0].location.name).to.equal('Test Location');
      expect(response.result[0].summary.weight).to.equal('50Kg');
      expect(response.result[0].summary.reps).to.equal(6);
      expect(response.result[0].summary.exercise_name).to.equal('Bench Press');

      expect(response.result[1].workout_date).to.equal('2016-01-02');
      expect(response.result[1].location).to.equal(null);

      done();
    });
  });

  it('retrieves a workout from a given URL', (done) => {
    const reqData = {
      method: 'get',
      url: '/workouts/2016-01-10',
      headers: headers
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(
        response.headers['content-type'].split(';')[0]
      ).to.equal('application/json');

      expect(response.result.workout_date).to.equal('2016-01-10');
      expect(response.result.location.name).to.equal('Test Location');
      expect(response.result.location.UserId).to.equal(undefined);

      expect(response.result.sets.length).to.equal(1);
      expect(response.result.sets[0].userId).to.equal(undefined);
      expect(response.result.sets[0].reps).to.equal(6);
      expect(response.result.sets[0].exercise_name).to.equal('Bench Press');
      expect(response.result.sets[0].exercise).to.equal(1);
      expect(response.result.sets[0].Exercise).to.equal(undefined);

      done();
    });
  });

  it('does not allow a user to view another user\'s workouts', (done) => {
    const reqData = {
      method: 'get',
      url: '/workouts/2016-01-06',
      headers: headers
    };

    server.inject(reqData, (response) => {
      expect(response.statusCode).to.equal(404);

      done();
    });
  });
});

describe('Create workout', () => {
  const g = proxyquire('../../api/workouts/google', {
    googleapis: {
      fitness: function() {
        console.log('fit logged');
        return {
          users: {
            sessions: {
              update: function() {
                console.log('update called');
              }
            }
          }
        };
      }
    }
  });

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

  it('can create a workout with pre-filled Sets', (done) => {
    const data = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-20',
        location: 1,
        sets: [
          {exercise: 1, weight: '60Kg', reps: 6},
          {exercise: 1, weight: '70Kg', reps: 6},
          {exercise: 1, weight: '80Kg', reps: 6}
        ]
      }
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.sets.length).to.equal(3);
      expect(response.result.sets[0].weight).to.equal('60Kg');
      expect(response.result.sets[0].exercise).to.equal(1);

      done();
    });
  });

  it('ignores attempts to pre-set the Set ID', (done) => {
    const data = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-20',
        location: 1,
        sets: [
          {exercise: 1, weight: '60Kg', reps: 6, id: 'ABC'}
        ]
      }
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.sets.length).to.equal(1);
      expect(response.result.sets[0].weight).to.equal('60Kg');
      expect(response.result.sets[0].exercise).to.equal(1);
      expect(response.result.sets[0].id).to.not.equal('ABC');

      done();
    });
  });

  it('checks the set for errors', (done) => {
    const data = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-20',
        location: 1,
        sets: [
          {exercise: 1, weight: '60Kg'}
        ]
      }
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(400);
      expect(response.result.sets.length).to.equal(1);
      expect(response.result.sets[0].reps.length).to.equal(1);
      expect(response.result.sets[0].reps[0]).to.equal("Reps can't be blank");

      done();
    });
  });

  it('can create a workout without a location', (done) => {
    const data = {
      method: 'post',
      url: '/workouts/',
      headers: headers,
      payload: {
        workout_date: '2016-01-20',
        sets: [
          {exercise: 1, weight: '60Kg', reps: 6},
          {exercise: 1, weight: '70Kg', reps: 6},
          {exercise: 1, weight: '80Kg', reps: 6}
        ]
      }
    };
    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.sets.length).to.equal(3);
      expect(response.result.sets[0].weight).to.equal('60Kg');
      expect(response.result.sets[0].exercise).to.equal(1);
      expect(response.result.location).to.equal(null);

      done();
    });
  });

  it('will attempt to record the workout with Google Fit', done => {
    done();
  });
});


describe('Update workout', () => {
  const g = proxyquire('../../api/workouts/google', {
    googleapis: {
      fitness: function() {
        console.log('fit logged');
        return {
          users: {
            sessions: {
              update: function() {
                console.log('update called');
              }
            }
          }
        };
      }
    }
  });

  beforeEach((done) => {
    construct.fixtures('./fixtures/workouts.yaml', done);
  });

  it('can add sets', (done) => {
    const data = {
      method: 'post',
      url: '/workouts/2016-01-10',
      headers: headers,
      payload: {
        sets: [
          {exercise: 1, weight: '60Kg', reps: 6},
          {exercise: 1, weight: '70Kg', reps: 6},
          {exercise: 1, weight: '80Kg', reps: 6}
        ]
      }
    };
    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.sets.length).to.equal(4);
      expect(response.result.sets[1].weight).to.equal('60Kg');
      expect(response.result.sets[1].exercise).to.equal(1);
      expect(response.result.sets[1].workout).to.equal(1);

      done();
    });
  });

  it('can overwrite set and ignores workout_date', (done) => {
    const data = {
      method: 'put',
      url: '/workouts/2016-01-10',
      headers: headers,
      payload: {
        workout_date: '2016-01-09',
        sets: [
          {exercise: 1, weight: '50Kg', reps: 6, id: 1},
          {exercise: 1, weight: '60Kg', reps: 6},
          {exercise: 1, weight: '70Kg', reps: 6},
          {exercise: 1, weight: '80Kg', reps: 6}
        ]
      }
    };
    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.workout_date).to.equal('2016-01-10');
      expect(response.result.sets.length).to.equal(4);
      expect(response.result.sets[0].weight).to.equal('50Kg');
      expect(response.result.sets[1].weight).to.equal('60Kg');
      expect(response.result.sets[1].exercise).to.equal(1);
      expect(response.result.sets[1].workout).to.equal(1);

      models.Set.findAll().then(function(result) {
        expect(result.length).to.equal(4);
        done();
      });
    });
  });

  it('can create a new workout to overwrite sets', (done) => {
    const data = {
      method: 'put',
      url: '/workouts/2016-01-29',
      headers: headers,
      payload: {
        workout_date: '2016-01-29',
        sets: [
          {exercise: 1, weight: '50Kg', reps: 6, id: 1},
          {exercise: 1, weight: '60Kg', reps: 6},
          {exercise: 1, weight: '70Kg', reps: 6},
          {exercise: 1, weight: '80Kg', reps: 6}
        ]
      }
    };
    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.workout_date).to.equal('2016-01-29');
      expect(response.result.sets.length).to.equal(4);

      expect(response.result.sets[0].weight).to.equal('50Kg');
      expect(response.result.sets[1].weight).to.equal('60Kg');
      expect(response.result.sets[1].exercise).to.equal(1);

      _.each(response.result.sets, (set) => {
        expect(set.id).to.not.equal(1);
      });

      models.Set.findAll().then(function(result) {
        expect(result.length).to.equal(5);

        return models.Workout.findOne({
          where: {
            workout_date: '2016-01-29',
            UserId: 1
          }
        });
      }).then(function(instance) {
        expect(
          instance.dataValues.id
        ).to.equal(
          response.result.sets[1].workout);
        done();
      });
    });
  });

  it('can remove sets', (done) => {
    const data = {
      method: 'put',
      url: '/workouts/2016-01-10',
      headers: headers,
      payload: {
        sets: [
          {exercise: 1, weight: '60Kg', reps: 6},
          {exercise: 1, weight: '70Kg', reps: 6}
        ]
      }
    };
    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.workout_date).to.equal('2016-01-10');
      expect(response.result.sets.length).to.equal(2);
      expect(response.result.sets[0].weight).to.equal('60Kg');
      expect(response.result.sets[1].weight).to.equal('70Kg');
      expect(response.result.sets[1].exercise).to.equal(1);
      expect(response.result.sets[1].workout).to.equal(1);

      models.Set.findAll().then(function(results) {
        expect(results.length).to.equal(2);
        done();
      });
    });
  });
});


describe('Exercise', () => {
  beforeEach((done) => {
    construct.fixtures('./fixtures/workouts.yaml', done);
  });

  it('can list all exercises from a user ordered by name', (done) => {
    const data = {
      method: 'get',
      url: '/exercises/',
      headers: headers
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.length).to.equal(2);
      expect(response.result[0].exercise_name).to.equal('Bench Press');
      expect(response.result[1].exercise_name).to.equal('Overhead Press');
      expect(response.result[0].sets.length).to.equal(1);
      expect(response.result[0].sets[0].reps).to.equal(6);
      expect(response.result[0].sets[0].workout_date).to.equal('2016-01-10');

      done();
    });
  });

  it('can create new exercises for a user', (done) => {
    const data = {
      method: 'patch',
      url: '/exercises/',
      headers: headers,
      payload: {
        exercise_name: 'Squat'
      }
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.exercise_name).to.equal('Squat');

      done();
    });
  });

  it('can match existing exercises from a string', (done) => {
    const data = {
      method: 'patch',
      url: '/exercises/',
      headers: headers,
      payload: {
        exercise_name: 'Bench Press'
      }
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.exercise_name).to.equal('Bench Press');
      expect(response.result.id).to.equal(1);

      done();
    });
  });

  it('can search Exercises by string', (done) => {
    const data = {
      method: 'get',
      url: '/exercises/?exercise_name=bench',
      headers: headers
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.length).to.equal(1);
      expect(response.result[0].exercise_name).to.equal('Bench Press');
      expect(response.result[0].id).to.equal(1);

      done();
    });
  });
});
