import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

/** This synchronises with the exercise API to make it easier to map our sets
*/
export const SetModel = Backbone.Model.extend({
  url: function() {
    const exercise_name = this.get('exercise_name');
    return `/exercises/?exercise_name=${exercise_name}`;
  },

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

  fetchExercise: function() {
    this.fetch({
      success: () => {
        const id = this.id;
        console.log('success', id);
        this.set({
          id: undefined,
          exercise: id
        });
      },
      complete: (res) => {
        console.log('sync', res);
        this.trigger('sync:exercise');
      }
    });
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
    return moment(this.get('workout_date')).fromNow();
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
