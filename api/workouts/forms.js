'use strict';

const _ = require('lodash');
const validate = require('validate.js');
const moment = require('moment');

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: value => +moment.utc(value),

  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

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

exports.exerciseQueryErrors = (params) => validate(params, {
  exercise_name: {
    length: {
      minimum: 1
    },
    presence: true
  }
});

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


exports.dateErrors = (params) => validate(params, {
  workout_date: {
    presence: true,
    date: true
  }
});
