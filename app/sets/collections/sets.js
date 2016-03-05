import {Collection} from 'backbone';

import _ from 'underscore';
import root from 'window-or-global';

import {LocalModel} from '../../base/models/storage';

import {SetModel, MODELNAME} from '../models/set';


export const SetList = Collection.extend({
  model: SetModel,

  comparator: function(first, second) {
    const workout1 = first.get('workout_date');
    const workout2 = second.get('workout_date');
    const created1 = first.get('createdAt');
    const created2 = second.get('createdAt');

    const dateOrder = this._orderOneTwo(workout2, workout1);

    if (dateOrder === 0) {
      return this._orderOneTwo(created1, created2);
    }
    return dateOrder;
  },

  /** Clear all stored Local Data related to sets.
      This will also look for potential data leaks and clean them up too so we
      remain under the 5M characters cap.
  */
  clearStored: function() {
    while (this.length > 0) {
      this.at(0).destroy();
    }
    const reString = '^' + MODELNAME + '-.*';
    const reObj = new RegExp(reString);

    const local = new LocalModel({
      modelname: MODELNAME
    });
    local.destroy();
    const indexes = _.map(root.localStorage, (v, k) => k);
    const keys = _.map(indexes, (i) => root.localStorage.key(i));
    const toRemove = _.filter(keys, (key) => reObj.exec(key) !== null);

    _.each(toRemove, (key) => root.localStorage.removeItem(key));
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
  },

  /** Handle the actual sorting of:
    first > second -> 1
    first < second -> -1
    first == second -> 0
  */
  _orderOneTwo: function(first, second) {
    if (first > second) {
      return 1;
    }
    else if (first < second) {
      return -1;
    }
    return 0;
  }
});
