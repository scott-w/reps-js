import Backbone from 'backbone';
import Workout from '../models/workout';

import {authSync} from '../../base/models/auth';

export default Backbone.Collection.extend({
  model: Workout,
  url: '/workouts/',
  sync: authSync
});
