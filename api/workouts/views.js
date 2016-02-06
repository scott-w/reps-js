/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const moment = require('moment');

const models = require('../../models');


const recordWorkout = function(request, reply) {
  var userId = request.auth.credentials.id;
  var date = request.payload.date;
  var location = request.payload.location;

  var workout = models.Workout.create({
    'workout_date': date,
    userId: userId,
    locationId: location
  }).then(function(workout){
    reply({
      id: workout.dataValues.id,
      date: workout.dataValues.workout_date,
      user: workout.dataValues.userId,
      location: workout.dataValues.locationId
    });
  });
};


const workoutsByDate = function(request, reply) {
  var userId = request.auth.credentials.id;

  models.Workout.findAll({
    attributes: [
      'workout_date', 'id'
    ],
    where: {
      userId: userId
    }
  }).then(function(results) {
    reply(_.map(results, function(item) {
      return {
        id: item.id,
        workout_date: moment(item.workout_date).format('YYYY-MM-DD'),
        url: `/workouts/${item.id}`
      };
    }));
  });
};

const retrieveWorkout = function(request, reply) {
  var userId = request.auth.credentials.id;

  models.Workout.findOne({
    attributes: [
      'id', 'workout_date'
    ],
    where: {
      id: request.params.workout,
      userId: userId
    },
    include: [
      {
        model: models.Location,
        as: 'location'
      }
    ]
  }).then(function(instance) {
    if (instance) {

      const workout = _.mapValues(instance.dataValues, (val, key) => {
        if (key === 'workout_date') {
          return moment(val).format('YYYY-MM-DD');
        }
        if (key === 'location') {
          return val.dataValues;
        }
        return val;
      });

      reply(workout);
    }
    else {
      reply({error: 'Not Found'}).code(404);
    }
  });
};


module.exports = {
  recordWorkout: recordWorkout,
  workoutsByDate: workoutsByDate,
  retrieveWorkout: retrieveWorkout
};
