import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

/** This synchronises with the exercise API to make it easier to map our sets
*/
export const SetModel = Backbone.Model.extend({
  url: '/exercises/',
  sync: authSync,

  defaults: {
    weight: '',
    reps: 0,
    exercise_name: ''
  },

  clearExerciseAttrs: function() {
    this.set({
      weight: '',
      reps: 0
    });
  },

  validate: function(attrs) {
    const errors = {};

    if (!attrs.exercise_name) {
      errors.exercise_name = 'This field must be set';
    }
    if (!attrs.reps) {
      errors.reps = 'Come on, you can do more than 0 reps!';
    }
    if (!attrs.weight) {
      errors.weight = 'Did you just lift air?';
    }
    if (!_.isEmpty(errors)) {
      return errors;
    }
  },

  /** Fetch an exercise from the server and synchronise the exercise ID to the
      exercise field to let this Set be synchronised into a Workout.
      Events:
        before:sync:exercise (this) => Before the sync request is fired
        sync:exercise (this, exercise) => When the sync is finished
  */
  fetchExercise: function() {
    this.set('id', 1);  // Force a patch
    this.trigger('before:sync:exercise', this);
    this.save(
      {exercise_name: this.get('exercise_name')},
      {
        patch: true,
        success: () => {
          const id = this.id;
          this.set({
            id: undefined,
            exercise: id
          });
        },
        complete: () => {
          this.trigger('sync:exercise', this, this.get('exercise'));
        }
      }
    );
  }
});

export const WorkoutModel = Backbone.Model.extend({
  idAttribute: 'workout_date',
  urlRoot: '/workouts/',
  sync: authSync,

  defaults: () => ({
    workout_date: moment().format('YYYY-MM-DD')
  }),

  formatDate: function() {
    return moment(this.get('workout_date')).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
  },

  /** Returns the list of exercises for this workout with each Set attached in
      the form:
      Exercise ->
        id -> Int
        exercise_name -> String
        sets -> [
          reps -> Int
          weight -> String
          created -> DateString (sort field)
        ]
  */
  getExercises: function() {

  },

  displayUrl: function() {
    return `/workout/${this.get('workout_date')}`;
  },

  isNew: function() {
    return _.isUndefined(this.get('id'));
  },

  validate: function(attrs) {
    const errors = {};
    if (!attrs.workout_date) {
      errors.workout_date = 'This field is required';
    }
    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});
