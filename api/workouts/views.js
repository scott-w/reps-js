/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var models = require('../models');


var workoutsByDate = function(request, reply) {
  var userId = request.auth.credentials.dataValues.id;

  models.Workout.findAll({
    attributes: [
      'workout_date'
    ],
    where: {
      userId: userId
    }
  }).then(function(results) {
    reply(results);
  });
};

var workoutOnDate = function(request, reply) {

};


module.exports = {
  workoutsByDate: workoutsByDate,
  workoutOnDate: workoutOnDate
};
