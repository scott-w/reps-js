import _ from 'underscore';
import Backbone from 'backbone';

import {SetModel, ExerciseModel, WorkoutModel} from '../models/workout';
import {LocalModel} from '../models/storage';

import {authSync} from '../../base/models/auth';


const MODELNAME = 'workouts.Set';


export const ExerciseList = Backbone.Collection.extend({
  model: ExerciseModel
});

export const SetList = Backbone.Collection.extend({
  model: SetModel,

  /** Clear all stored Local Data related to sets.
      This will also look for potential data leaks and clean them up too so we
      remain under the 5M characters cap.
  */
  clearStored: function() {
    this.each((model) => model.destroy());
    const reString = '^' + MODELNAME + '-.*';
    const reObj = new RegExp(reString);

    const local = new LocalModel({
      modelname: MODELNAME
    });
    local.destroy();
    const indexes = _.map(window.localStorage, (v, k) => k);
    const keys = _.map(indexes, (i) => window.localStorage.key(i));
    const toRemove = _.filter(keys, (key) => reObj.exec(key) !== null);

    _.each(toRemove, (key) => window.localStorage.removeItem(key));
    this.trigger('clear');
  },

  /** Search localStorage for any unsaved sets and restore the workout.
  */
  fetchStored: function() {
    const local = new LocalModel({
      modelname: MODELNAME
    });

    local.fetch({
      success: () => {
        const models = _.map(local.getIds(), (id) => {
          const set = new SetModel({id: id});
          return set;
        });
        let completed = 0;
        const TO_COMPLETE = models.length;

        this.set(models);

        _.each(models, (set) => {
          set.fetch({
            success: () => {
              completed += 1;
              if (completed === TO_COMPLETE) {
                this.trigger('loaded', this);
              }
            },
            error: () => {
              completed += 1;
              if (completed === TO_COMPLETE) {
                this.trigger('loaded', this);
              }
            }
          });
        });
      }
    });
  },

  /** Add a set to the list and save it to disk.
  */
  addSet: function(model) {
    const attrs = model.pick('exercise_name', 'weight', 'reps');

    const set = new SetModel();
    set.save(attrs, {
      success: () => {
        const local = new LocalModel({
          modelname: MODELNAME
        });

        local.fetch({
          success: () => {
            local.addId(set.id);
            this.add(set);
          },
          error: () => {
            local.addId(set.id);
            this.add(set);
          }
        });
      }
    });

  },

  /** Loop through the attached sets and set Exercise ID fields if they exist,
      or start grabbing them from the server.
  */
  setExerciseIds: function() {
    const emptyExercise = this._getEmptyExercises();
    const byExercise = this.groupBy('exercise_name');

    _.each(emptyExercise, (item) => {
      const name = item.get('exercise_name');
      const exerciseList = byExercise[name];
      if (_.isUndefined(exerciseList)) {
        return;
      }

      const idMap = _.filter(exerciseList, (item) => item.get('exercise'));

      if (!idMap.length) {
        return;
      }
      item.set({exercise: idMap[0].get('exercise')});
    });
  },

  /** Loop through unidentified Exercises and find any matching Id fields.
      This only fetches unique exercise_name values.
      For the best (least network-usage) result, call setExerciseIds before
      and after calling this method.
  */
  fetchExerciseIds: function() {
    const byExercise = this.groupBy('exercise_name');
    const emptyExercise = _.filter(
      _.map(byExercise, (item) => item[0]),
      (item) => !item.get('exercise')
    );

    let synched = 0;
    const length = emptyExercise.length;

    _.each(emptyExercise, (exercise) => {
      this.listenToOnce(exercise, 'sync:exercise', () => {
        synched += 1;
        if (length === synched) {
          this.trigger('sync');
        }
      });

      exercise.fetchExercise();
    });
  },

  _getEmptyExercises: function() {
    return this.filter((item) => !item.get('exercise'));
  }
});

export const WorkoutList = Backbone.Collection.extend({
  model: WorkoutModel,
  url: '/workouts/',
  sync: authSync,

  comparator: function(first, second) {
    const date1 = first.get('workout_date');
    const date2 = second.get('workout_date');

    if (date1 > date2) {
      return -1;
    }
    else if (date1 < date2) {
      return 1;
    }
    return 0;
  }
});
