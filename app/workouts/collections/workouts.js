import Backbone from 'backbone';
import {SetModel, WorkoutModel} from '../models/workout';

import {authSync} from '../../base/models/auth';

export const SetList = Backbone.Collection.extend({
  model: SetModel
});

export const WorkoutList = Backbone.Collection.extend({
  model: WorkoutModel,
  url: '/workouts/',
  sync: authSync
});
