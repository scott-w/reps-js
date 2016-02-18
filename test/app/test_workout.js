/* jshint node: true */
/* jshint esversion: 6 */

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

import {SetList} from '../../app/workouts/collections/workouts';

describe('Set List', () => {
  var collection;

  beforeEach(function(done) {
    collection = new SetList([
      {exercise_name: 'Bench Press', reps: 1, weight: '80Kg'},
      {exercise_name: 'Bench Press', exercise: 2, reps: 3, weight: '70Kg'}
    ]);
    done();
  });

  it('assigns exercise IDs if it finds a matching exercise_name', (done) => {
    collection.setExerciseIds();
    expect(collection.at(0).get('exercise')).to.equal(2);
    done();
  });
});
