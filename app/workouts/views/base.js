import _ from 'underscore';
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
    this.collection = new WorkoutCollection(null);
    this.collection.fetch();
  },

  showWorkoutList: function() {
    const list = new WorkoutList({
      collection: this.collection,
    });
    this.showChildView('container', list);
    return list;
  },

  showCreateWorkout: function() {
    const create = new CreateWorkout({
      collection: this.collection,
      model: new WorkoutModel()
    });
    this.showChildView('container', create);
    return create;
  },

  /** Hook to allow the controller to instruct this view to grab a model, if
      it's in the collection, and render it.
      Alternatively, this will fetch the model from the workout_date from the
      server and render that.
  */
  showWorkoutDetail: function(workout_date) {
    const list = this.showWorkoutList();

    let model = this.collection.get(workout_date);
    if (_.isUndefined(model)) {
      model = new WorkoutModel({
        workout_date: workout_date
      });
      model.fetch({
        success: () => list.showWorkout(model)
      });
    }
    else {
      list.showWorkout(model);
    }
  },

  onChildviewShowCreateWorkout: function() {
    this.showCreateWorkout();
  },

  onChildviewShowList: function() {
    this.showWorkoutList();
  },

  onChildviewAddToCollection: function(model) {
    const collection = this.collection;
    collection.add(model);
    console.log(collection);
    collection.sort();
    console.log(collection);
  }
});
