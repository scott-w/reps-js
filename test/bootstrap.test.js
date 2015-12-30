var fs = require('fs');

var Sails = require('sails'),
  Barrels = require('barrels'),
  sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  fs.unlink('.tmp/localDiskDb.db', function unlinkDone(error) {

    Sails.lift({
      port: 1338,
      log: {
        level: 'info'
      },
      models: {
        connection: 'workouts_test',
        migrate: 'drop'
      },
      // Strip authentication for testing
      policies: {
        '*': true,
        Workout: ['testLogin']
      }

      // configuration for testing purposes
    }, function(err, sails) {
      // done(err, sails);
      if (err) return done(err);

      // here you can load fixtures, etc.
      var barrels = new Barrels();

      // Populate the DB
      barrels.populate(['user', 'location'], function() {
        barrels.populate(['exercise', 'workout'], function() {
          barrels.populate(['set'], done);
        });
      });

    });
  });

});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
