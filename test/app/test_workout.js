/* jshint node: true */
/* jshint esversion: 6 */

const Code = require('code');
const Lab = require('lab');
const sinon = require('sinon');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {SetList} from '../../app/workouts/collections/workouts';

describe('Set List', () => {
  var collection;

  afterEach(function(done) {
    collection = null;
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
      {exercise_name: 'Squat', reps: 5, weight: '120Kg', id: 4}
    ]);

    collection.once('sync', function() {
      expect(collection.at(1).get('exercise')).to.equal(4);
      done();
    });
    collection.fetchExerciseIds();
  });
});
