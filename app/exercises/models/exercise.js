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

  getSetSummary: function(Collection = Backbone.Collection) {
    if (_.isUndefined(this._sliced)) {
      this._sliced = new Collection(null);
    }
    this._sliced.set(this.get('sets').slice(0, 10));
    return this._sliced;
  },

  getLastExercise: function() {
    const sets = _.chain(this.getAllSets());
    const latestDate = sets.reduce(
      function(memo, set) {
        const workout_date = set.workout_date;

        return workout_date > memo ? workout_date : memo;
      },
      '1900-01-01'
    ).value();
    return sets.where({workout_date: latestDate}).value();
  }
});
