/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

var models = require('../models');


var recordWorkout = function(request, reply) {
  var userId = request.auth.credentials.dataValues.id;
  var date = request.payload.date;
  var location = request.payload.location;

  console.log('Build');
  var workout = models.Workout.build({
    'workout_date': date,
    user: userId,
    location: location
  });
  console.log('Save');

  workout.save().then(function(workout){
    reply({
      id: workout.dataValues.id,
      date: workout.dataValues.workout_date,
      user: workout.dataValues.userId,
      location: workout.dataValues.locationId
    });
  });
};


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
  recordWorkout: recordWorkout,
  workoutsByDate: workoutsByDate,
  workoutOnDate: workoutOnDate
};
