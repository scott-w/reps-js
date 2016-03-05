import {Model} from 'backbone';
import LocalStorage from 'backbone.localstorage';

import moment from 'moment';
import validate from 'validate.js';

import {authSync} from '../../base/models/auth';


/** This synchronises with the exercise API to make it easier to map our sets
*/
export const SetModel = Model.extend({
  url: '/exercises/',
  sync: authSync,
  localStorage: new LocalStorage('workouts.Set'),

  defaults: {
    weight: '',
    reps: '',
    exercise_name: '',
    workout_date: ''
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
