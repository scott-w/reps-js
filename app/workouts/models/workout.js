import moment from 'moment';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

export const SetModel = Backbone.Model.extend({
  defaults: {
    weight: '',
    reps: 0,
    exercise_name: ''
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
