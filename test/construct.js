'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

const Fixtures = require('sequelize-fixtures');

const models = require('../models');


exports.fixtures = function(fixtures, done) {
  const options = {cascade: true};

  models.Exercise.truncate(options).then(() => {
    models.Location.truncate(options).then(() => {
      models.Set.truncate(options).then(() => {
        models.User.truncate(options).then(() => {
          models.Workout.truncate(options).then(() => {
            Fixtures.loadFile(fixtures, models).then(() => {
              if (done) {
                done();
              }
            });
          });
        });
      });
    });
  });
};
