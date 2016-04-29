'use strict';

const _ = require('lodash');
const validate = require('validate.js');
const moment = require('moment');

validate.extend(validate.validators.datetime, {
  // value will be anything except null/undefined
  parse: value => +moment.utc(value),

  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

/** Validate a list of sets for adding a workout.
    This provides validation for each set.
*/
validate.validators.setList = (value) => {
  const setValidator = (params) => validate(params, {
    exercise: {
      numericality: {
        onlyInteger: true,
        greaterThan: 0
      },
      presence: true
    },
    weight: {
      length: {
        minimum: 1
      },
      presence: true
    },
    reps: {
      numericality: {
        onlyInteger: true,
        greaterThan: 0
      },
      presence: true
    }
  });
  if (_.isUndefined(value)) {
    return;
  }
  if (!validate.isArray(value)) {
    return 'must be an array';
  }
  const chained = _.chain(value);
  const setErrors = chained.map(i => setValidator(i)).filter(i => i).value();

  if (setErrors.length) {
    return setErrors;
  }
};

/** Validate a search query for exercises by name
*/
exports.exerciseQueryErrors = (params) => validate(params, {
  exercise_name: {
    length: {
      minimum: 1
    },
    presence: true
  }
});

/** Validate the create workout parameters. This includes sets.
*/
exports.createWorkoutErrors = (params) => validate(params, {
  workout_date: {
    presence: true,
    date: true
  },
  location: {},
  sets: {
    setList: true
  }
});


/** Validate the workout_date parameter when retrieving a workout.
*/
exports.dateErrors = (params) => validate(params, {
  workout_date: {
    presence: true,
    date: true
  }
});
