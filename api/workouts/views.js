/* jshint node: true */
/* jshint esversion: 6 */
'use strict';

const _ = require('lodash');
const moment = require('moment');

const models = require('../../models');
const util = require('./util');

const _replyExercise = function(data, reply) {
  return reply({
    exercise_name: data.exercise_name,
    id: data.id
  });
};

const getExercises = function(request, reply) {
  const userId = request.auth.credentials.id;
  const exerciseName = request.query.exercise_name;

  const whereClause = {
    UserId: userId
  };
  if (exerciseName) {
    whereClause.exercise_name  = {
      $ilike: `%${exerciseName}%`
    };
  }
  models.Exercise.findAll({
    select: ['id', 'exercise_name', 'createdAt', 'updatedAt'],
    where: whereClause,
    include: [
      {
        model: models.Set,
        select: ['id', 'reps', 'weight', 'createdAt', 'updatedAt'],
        include: [
          {
            model: models.Workout,
            select: ['workout_date'],
            where: {
              UserId: userId
            },
            required: false
          }
        ]
      }
    ]
  }).then((results) => reply(_.map(results, (exercise) => ({
    id: exercise.dataValues.id,
    exercise_name: exercise.dataValues.exercise_name,
    sets: _.map(exercise.dataValues.Sets, (set) => ({
      id: set.dataValues.id,
      reps: set.dataValues.reps,
      weight: set.dataValues.weight,
      workout_date: moment(
        set.dataValues.Workout.dataValues.workout_date).format('YYYY-MM-DD'),
      createdAt: set.dataValues.createdAt,
      updatedAt: set.dataValues.updatedAt
    }))
  }))));
};

const createExercise = function(request, reply) {
  const userId = request.auth.credentials.id;
  const exerciseName = request.payload.exercise_name;

  util.getExercise(userId, exerciseName).then(function(check) {
    if (check) {
      _replyExercise(check.dataValues, reply);
    }
    else {
      models.Exercise.create({
        UserId: userId,
        exercise_name: exerciseName
      }).then(function(instance) {
        _replyExercise(instance.dataValues, reply).code(201);
      }).catch(function(err) {
        console.log(err);
        reply({error: err}).code(400);
      });
    }
  });
};

const recordWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.payload.workout_date;
  const locationId = request.payload.location;

  util.getWorkout(userId, workoutDate).then(function(check) {
    if (check) {
      reply({workout_date: 'Cannot duplicate the workout_date'}).code(400);
    }
    else {
      let sets = request.payload.sets || [];
      let createData = {
        'workout_date': workoutDate,
        UserId: userId,
        Sets: _.map(
          sets, (set) => ({
            ExerciseId: set.exercise,
            reps: set.reps,
            weight: set.weight
          })
        )
      };
      if (locationId) {
        createData.LocationId = locationId;
      }

      models.Workout.create(createData, {
        include: [models.Set]
      }).then((instance) => {
        const workout = instance.dataValues;
        const sets = _.map(instance.dataValues.Sets, (set) => set.dataValues);

        models.Location.findOne({
          where: {
            id: locationId
          },
          attributes: ['name', 'createdAt', 'updatedAt']
        }).then((result) => {
          let location;
          if (result) {
            location = {
              id: locationId,
              name: result.dataValues.name,
              updatedAt: result.dataValues.updatedAt,
              createdAt: result.dataValues.createdAt
            };
          }
          else {
            location = null;
          }

          reply({
            id: workout.id,
            workout_date: moment(workout.workout_date).format('YYYY-MM-DD'),
            Sets: sets,
            Location: location
          }).code(201);
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  });
};


const workoutsByDate = function(request, reply) {
  const userId = request.auth.credentials.id;

  models.Workout.findAll({
    attributes: [
      'workout_date', 'id'
    ],
    where: {
      UserId: userId
    },
    include: [
      {model: models.Location}
    ],
    order: [
      ['workout_date', 'DESC']
    ]
  }).then(function(results) {
    reply(_.map(results, function(item) {
      let location;
      if (item.Location) {
        location = {
          name: item.Location.dataValues.name,
          id: item.Location.dataValues.id
        };
      }
      else {
        location = null;
      }
      return {
        id: item.id,
        workout_date: moment(item.workout_date).format('YYYY-MM-DD'),
        url: `/workouts/${moment(item.workout_date).format('YYYY-MM-DD')}`,
        location: location
      };
    }));
  });
};

const retrieveWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.params.workout_date;

  models.Workout.findOne({
    attributes: [
      'id', 'workout_date', 'LocationId'
    ],
    where: {
      workout_date: workoutDate,
      UserId: userId
    },
    include: [
      {model: models.Location},
      {model: models.Set, include: [models.Exercise]}
    ]
  }).then((instance) => {
    if (instance) {
      const workout = instance.dataValues;
      let location = null;
      if (workout.Location) {
        let locationVal = workout.Location.dataValues;
        location = {
          name: locationVal.name,
          id: locationVal.id
        };
      }

      reply({
        workout_date: moment(workout.workout_date).format('YYYY-MM-DD'),
        location: location,
        sets: _.map(workout.Sets, (set) => ({
          id: set.dataValues.id,
          reps: set.dataValues.reps,
          weight: set.dataValues.weight,
          createdAt: set.dataValues.createdAt,
          exercise: set.dataValues.Exercise.dataValues.id,
          exercise_name: set.dataValues.Exercise.dataValues.exercise_name
        }))
      });
    }
    else {
      reply({error: 'Not Found'}).code(404);
    }

  });
};


const addSets = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.params.workout_date;

  util.getWorkout(userId, workoutDate).then((instance) => {
    if (instance) {
      models.Set.bulkCreate(
        _.map(request.payload.sets, (set) => ({
          WorkoutId: instance.dataValues.id,
          ExerciseId: set.exercise,
          reps: set.reps,
          weight: set.weight
        }))
      ).then(() => {
        models.Set.findAll({
          where: {
            WorkoutId: instance.dataValues.id
          }
        }).then((sets) => {
          let response = {
            id: instance.dataValues.id,
            Sets: _.map(sets, (set) => set.dataValues),
            workout_date: instance.dataValues.workout_date
          };
          reply(response).code(201);
        });
      });
    }
    else {
      reply({error: 'Not Found'}).code(404);
    }
  });
};

const updateWorkout = function(request, reply) {
  const userId = request.auth.credentials.id;
  const workoutDate = request.params.workout_date;

  util.getWorkout(userId, workoutDate, [models.Set]).then((instance) => {
    if (instance) {
      util.updateSets(
        instance.dataValues.Sets, request.payload.sets, instance.dataValues.id
      ).then((sets) => {
        let response = {
          id: instance.dataValues.id,
          Sets: _.map(sets, (set) => set.dataValues),
          workout_date: moment(
            instance.dataValues.workout_date
          ).format('YYYY-MM-DD')
        };

        reply(response).code(200);
      });
    }
    else {
      reply({error: 'Not Found'}).code(404);
    }
  });
};


module.exports = {
  recordWorkout: recordWorkout,
  workoutsByDate: workoutsByDate,
  retrieveWorkout: retrieveWorkout,
  addSetsToWorkout: addSets,
  getExercises: getExercises,
  createExercise: createExercise,
  updateWorkout: updateWorkout
};
