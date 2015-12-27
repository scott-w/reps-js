var Sails = require('sails'),
  Barrels = require('barrels'),
  sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    port: 1338,
    models: {
      connection: 'workouts_test',
      migrate: 'drop'
    },
    // Strip authentication for testing
    policies: {
      '*': true,
      Workout: ['sessionAuth']
    }
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);

    // here you can load fixtures, etc.
    var barrels = new Barrels();

    // Populate the DB
    barrels.populate(function(err) {
      done(err, sails);
    });

    // done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
