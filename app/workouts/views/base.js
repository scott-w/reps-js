import Marionette from 'backbone.marionette';

import {WorkoutModel} from '../models/workout';
import {WorkoutList as WorkoutCollection} from '../collections/workouts';

import {WorkoutList} from './workouts';
import {CreateWorkout} from './create';

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
  },

  showCreateWorkout: function() {
    this.showChildView('container', new CreateWorkout({
      collection: this.getOption('workouts'),
      model: new WorkoutModel()
    }));
  },

  onChildviewShowCreateWorkout: function() {
    this.showCreateWorkout();
  },

  onChildviewShowList: function() {
    this.showWorkoutList();
  },

  onChildviewAddToCollection: function(model) {
    const collection = this.getOption('workouts');
    collection.add(model);
    console.log(collection);
    collection.sort();
    console.log(collection);
  }
});
