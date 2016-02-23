import {SetList} from '../collections/workouts';

import {CreateWorkout} from './create';

export const UpdateWorkout = CreateWorkout.extend({
  template: require('../templates/update/layout.html'),

  modelEvents: {
    sync: 'updateSets'
  },

  initialize: function() {
    this.collection = new SetList(this.model.get('sets'));
  },

  updateSets: function() {
    this.collection.set(this.model.get('sets'));
  }
});
