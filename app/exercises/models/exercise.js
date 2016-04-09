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
    if (_.isUndefined(this._collection)) {
      this._collection = new Collection(null);
    }
    this._collection.set(this.get('sets').slice(0, 10));
    return this._collection;
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
