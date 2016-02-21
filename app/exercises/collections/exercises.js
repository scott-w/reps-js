import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';


export const SetList = Backbone.Collection.extend({
  comparator: function(first, second) {
    const workout1 = first.get('workout_date');
    const workout2 = second.get('workout_date');

    if (workout1 > workout2) {
      return -1;
    }
    else if (workout1 < workout2) {
      return 1;
    }
    return 0;
  }
});

export const ExerciseList = Backbone.Collection.extend({
  url: '/exercises/',
  sync: authSync,

  comparator: 'exercise_name'
});
