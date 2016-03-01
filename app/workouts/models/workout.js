import _ from 'underscore';
import moment from 'moment';
import validate from 'validate.js';
import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';

import {authSync} from '../../base/models/auth';

export const ExerciseModel = Backbone.Model.extend({

});

/** This synchronises with the exercise API to make it easier to map our sets
*/
export const SetModel = Backbone.Model.extend({
  url: '/exercises/',
  sync: authSync,
  localStorage: new LocalStorage('workouts.Set'),

  defaults: {
    weight: '',
    reps: '',
    exercise_name: ''
  },

  /** Perform a reduced clear operation that lets us refocus on the weight.
  */
  clearExerciseAttrs: function() {
    this.set({
      weight: '',
      reps: ''
    });
  },

  /** Validators for the set
  */
  validate: function(attrs) {
    return validate(attrs, {
      exercise_name: {
        presence: true
      },
      reps: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThan: 0
        }
      },
      weight: {
        presence: true
      }
    });
  },

  /** Returns the date formatted relative to today
  */
  formatDate: function() {
    return moment(this.get('workout_date')).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'DD/MM/YYYY'
    });
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

        ajaxSync: true,

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

  isNew: function() {
    return _.isUndefined(this.get('id'));
  },

  validate: function(attrs) {
    return validate(attrs, {
      workout_date: {
        presence: true
      }
    });
  }
});
