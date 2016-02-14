import Marionette from 'backbone.marionette';

import WorkoutCollection from '../collections/workouts';

import {WorkoutList} from './workouts';

export default Marionette.View.extend({
  className: 'col-lg-10 col-lg-offset-1 col-sm-12',
  template: require('../templates/layout.html'),

  regions: {
    container: '.workout-container-hook'
  },

  initialize: function() {
    this.options.workouts = new WorkoutCollection(null);
    this.options.workouts.fetch();
  },

  showWorkoutList: function() {
    this.showChildView('container', new WorkoutList({
      collection: this.getOption('workouts')
    }));
  }
});
