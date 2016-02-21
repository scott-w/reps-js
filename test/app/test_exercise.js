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

import {SetList} from '../../app/exercises/collections/exercises';


describe('SetList collection', function() {
  var collection;

  beforeEach((done) => {
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

    done();
  });

  it('orders with the newest workouts first, then by created date', (done) => {
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
