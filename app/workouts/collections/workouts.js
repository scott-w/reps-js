import Backbone from 'backbone';
import Workout from '../models/workout';

export default Backbone.Collection.extend({
  model: Workout,
  url: '/workouts/'
});
