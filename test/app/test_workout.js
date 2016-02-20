/* jshint node: true */
/* jshint esversion: 6 */

const Code = require('code');
const Lab = require('lab');
const sinon = require('sinon');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {SetList} from '../../app/workouts/collections/workouts';

describe('Set List', () => {
  var collection;
  var xhr;
  var requests = [];

  beforeEach(function(done) {
    xhr = sinon.useFakeXMLHttpRequest();
    global.window.XMLHttpRequest = xhr;
    xhr.onCreate = function(req) {
      requests.push(req);
    };
    done();
  });

  afterEach(function(done) {
    // server.restore();
    collection = null;
    xhr.restore();
    requests = [];
    xhr = null;
    done();
  });

  it('assigns exercise IDs if it finds a matching exercise_name', (done) => {
    collection = new SetList([
      {exercise_name: 'Bench Press', reps: 1, weight: '80Kg'},
      {exercise_name: 'Bench Press', exercise: 2, reps: 3, weight: '70Kg'},
      {exercise_name: 'Squat', reps: 5, weight: '120Kg'}
    ]);

    collection.setExerciseIds();
    expect(collection.at(0).get('exercise')).to.equal(2);
    done();
  });

  it('fetches exercise IDs from the server if they exist', (done) => {
    collection = new SetList([
      {exercise_name: 'Bench Press', exercise: 2, reps: 3, weight: '70Kg'},
      {exercise_name: 'Squat', reps: 5, weight: '120Kg'}
    ]);

    const responseBody = {
      id: 4,
      exercise_name: 'Squat'
    };
    const headers = {
      'Content-type': 'application/json'
    };

    collection.once('sync', function() {
      expect(collection.at(1).get('exercise')).to.equal(4);
      done();
    });
    collection.fetchExerciseIds();
    expect(requests.length).to.equal(1);
    requests[0].respond(200, headers, JSON.stringify(responseBody));
  });
});
