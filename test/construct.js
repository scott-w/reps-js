'use strict';
/* jshint node: true */
/* jshint esversion: 6 */

const Fixtures = require('sequelize-fixtures');

const models = require('../models');


exports.fixtures = function(fixtures, done) {
  const options = {cascade: true};

  models.sequelize.sync({force: true}).then(() => {
    Fixtures.loadFile(fixtures, models).then(() => {
      if (done) {
        done();
      }
    }).catch((err) => {
      console.error('loadFileErr', err);
    });
  }).catch((err) => {
    console.error('syncErr', err);
  });
};
