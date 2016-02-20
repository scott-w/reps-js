/* jshint node: true */
/* jshint esversion: 6 */

const Code = require('code');
const Lab = require('lab');

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
      expect(response.result[0].Location.name).to.equal('Test Location');
      expect(response.result[1].workout_date).to.equal('2016-01-02');
      expect(response.result[1].Location).to.equal(null);

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
      expect(response.result.Location.name).to.equal('Test Location');

      expect(response.result.Sets.length).to.equal(1);
      expect(response.result.Sets[0].reps).to.equal(6);
      expect(
        response.result.Sets[0].Exercise.exercise_name
      ).to.equal('Bench Press');

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
      expect(response.result.Location.name).to.equal('Test Location');

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
      expect(response.result.Location.name).to.equal('Test Location');

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
      expect(response.result.Sets.length).to.equal(3);
      expect(response.result.Sets[0].weight).to.equal('60Kg');
      expect(response.result.Sets[0].ExerciseId).to.equal(1);

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
      expect(response.result.Sets.length).to.equal(3);
      expect(response.result.Sets[0].weight).to.equal('60Kg');
      expect(response.result.Sets[0].ExerciseId).to.equal(1);
      expect(response.result.Location).to.equal(null);

      done();
    });
  });
});


describe('Update workout', () => {
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
      expect(response.result.Sets.length).to.equal(4);
      expect(response.result.Sets[1].weight).to.equal('60Kg');
      expect(response.result.Sets[1].ExerciseId).to.equal(1);
      expect(response.result.Sets[1].WorkoutId).to.equal(1);

      done();
    });
  });
});


describe('Exercise', () => {
  beforeEach((done) => {
    construct.fixtures('./fixtures/workouts.yaml', done);
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

  it('can retrieve an Exercise by string', (done) => {
    const data = {
      method: 'get',
      url: '/exercises/?exercise_name=Bench%20Press',
      headers: headers
    };

    server.inject(data, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result.exercise_name).to.equal('Bench Press');
      expect(response.result.id).to.equal(1);

      done();
    });
  });
});
