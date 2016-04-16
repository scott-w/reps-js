import _ from 'underscore';
import moment from 'moment';
import validate from 'validate.js';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

export const ExerciseModel = Backbone.Model.extend({

});


export const WorkoutModel = Backbone.Model.extend({
  idAttribute: 'workout_date',
  urlRoot: '/workouts/',
  sync: authSync,

  defaults: () => ({
    workout_date: moment().format('YYYY-MM-DD'),
    summary: {}
  }),

  /** Return a formatted date relative to the current date
  */
  formatDate: function() {
    return moment(this.get('workout_date')).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
  },

  /** Save the workout against the server
  */
  saveWorkout: function(attrs, options) {
    let success = null;
    if (_.isUndefined(options)) {
      options = {};
    }

    if (options.success) {
      success = options.success;
    }

    options.success = () => {
      if (success) {
        success(arguments);
      }
      this.trigger('save', this);
    };
    this.save(attrs, options);
  },

  /** Generate a summary of the latest workout
      Returns a Map:
      exercise_name -> String
      reps -> Int
      weight -> String
  */
  getSummary: function() {
    const summary = this.get('summary') || {};

    return _.defaults(summary, {
      exercise_name: '',
      reps: '',
      weight: ''
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
    const exercises = new Backbone.Collection(_.sortBy(
      this.get('sets'), 'exercise_name'
    ));
    const grouped = exercises.groupBy('exercise');

    return _.map(grouped, (val, key) => (new ExerciseModel({
      id: key,
      exercise_name: val[0].get('exercise_name'),
      sets: _.sortBy(val, (model) => model.get('createdAt'))
    })));
  },

  /** Grab the workout referenced by workout_date
  */
  getWorkout: function(workout_date) {
    if (_.isUndefined(workout_date)) {
      workout_date = this.get('workout_date');
    }
    if (_.isUndefined(workout_date)) {
      console.error('Workout Date is not defined. Cannot fetch.');
    }
    this.set({
      id: 1,
      workout_date: workout_date
    });
    this.fetch({
      success: () => this.trigger('fetch', this)
    });
  },

  displayUrl: function() {
    return `/workout/${this.get('workout_date')}`;
  },

  /** Summarise the workout from the attached sets.
  */
  summariseWorkout: function() {
    const sets = this.get('sets') || [];
    if (sets.length) {
      let set = sets[0];
      this.set({
        summary: {
          exercise_name: set.exercise_name,
          reps: set.reps,
          weight: set.weight
        }
      });
    }
  },

  validate: function(attrs) {
    return validate(attrs, {
      workout_date: {
        presence: true
      }
    });
  }
});
