import {SetList} from '../../sets/collections/sets';

import {CreateWorkout} from './create';

export const UpdateWorkout = CreateWorkout.extend({
  template: require('../templates/update/layout.html'),

  modelEvents: {
    fetch: 'updateSets',
    save: 'saveComplete'
  },

  initialize: function() {
    this.collection = new SetList(this.model.get('sets'));
  },

  updateSets: function() {
    this.collection.set(this.model.get('sets'));
  }
});
