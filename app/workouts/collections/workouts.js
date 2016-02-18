import _ from 'underscore';
import Backbone from 'backbone';
import {SetModel, WorkoutModel} from '../models/workout';

import {authSync} from '../../base/models/auth';

export const SetList = Backbone.Collection.extend({
  model: SetModel,

  /** Loop through the attached sets and set Exercise ID fields if they exist,
      or start grabbing them from the server.
  */
  setExerciseIds: function() {
    const emptyExercise = this.filter((item) => !item.get('exercise'));
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
  }
});

export const WorkoutList = Backbone.Collection.extend({
  model: WorkoutModel,
  url: '/workouts/',
  sync: authSync
});
