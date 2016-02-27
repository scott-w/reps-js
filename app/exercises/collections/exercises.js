import _ from 'underscore';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

import {SetModel, ExerciseModel} from '../models/exercise';


export const SetList = Backbone.Collection.extend({
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

export const ExerciseList = Backbone.Collection.extend({
  model: ExerciseModel,
  sync: authSync,

  comparator: 'exercise_name',

  initialize: function(data, options) {
    this.searchModel = options.searchModel;
  },

  url: function() {
    if (_.isUndefined(this.searchModel)) {
      return '/exercises/';
    }
    return this.searchModel.url();
  }
});
