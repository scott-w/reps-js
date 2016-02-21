import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

export const ExerciseList = Backbone.Collection.extend({
  url: '/exercises/',
  sync: authSync
});
