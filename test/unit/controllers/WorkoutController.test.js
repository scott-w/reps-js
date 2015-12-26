var Barrels = require('barrels');
var assert = require('assert');
var request = require('supertest');

describe('WorkoutsController', function() {

  describe('#list', function() {

    it('returns an empty list', function(done) {
      request(sails.hooks.http.app).get('/Workout').expect(200).end(
        function(err, res) {
          if (err) {
            return done(err);
          }

          assert.ok(_.isArray(res.body));
          assert.equal(res.body.length, 0, 'Response body not empty');
          done();
        });
    });

  });
});
