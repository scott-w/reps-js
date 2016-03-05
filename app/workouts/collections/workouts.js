import Backbone from 'backbone';

import {ExerciseModel, WorkoutModel} from '../models/workout';

import {authSync} from '../../base/models/auth';


export const ExerciseList = Backbone.Collection.extend({
  model: ExerciseModel
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
