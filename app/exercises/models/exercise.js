import _ from 'underscore';
import Backbone from 'backbone';

import moment from 'moment';


export const ExerciseModel = Backbone.Model.extend({
  defaults: () => ({
    exercise_name: '',
    workout_date: moment().format('YYYY-MM-DD'),
    sets: []
  }),

  getAllSets: function() {
    return this.get('sets');
  },

  getLastExercise: function() {
    const sets = this.get('sets');
    const latestDate = _.reduce(
      sets,
      function(memo, set) {
        const workout_date = set.workout_date;

        return workout_date > memo ? workout_date : memo;
      },
      '1900-01-01'
    );
    return _.where(sets, {workout_date: latestDate});
  }
});
