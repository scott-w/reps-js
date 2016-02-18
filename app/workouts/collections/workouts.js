import Backbone from 'backbone';
import {SetModel, WorkoutModel} from '../models/workout';

import {authSync} from '../../base/models/auth';

export const SetList = Backbone.Collection.extend({
  model: SetModel,

  /** Loop through the attached sets and set Exercise ID fields if they exist,
      or start grabbing them from the server.
  */
  setExerciseIds: function() {

  }
});

export const WorkoutList = Backbone.Collection.extend({
  model: WorkoutModel,
  url: '/workouts/',
  sync: authSync
});
