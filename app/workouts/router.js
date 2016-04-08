import {BaseController} from '../base/controller';

import {WorkoutList as WorkoutCollection} from './collections/workouts';
import WorkoutList from './views/base';

export const Controller = BaseController.extend({
  layoutView: WorkoutList,

  initialize: function() {
    this.collection = new WorkoutCollection(null);
    this.collection.fetch();
  },

  listWorkout: function() {
    const layout = this.showAndGetLayout({collection: this.collection});
    layout.showWorkoutList();
  },

  createWorkout: function() {
    const layout = this.showAndGetLayout({collection: this.collection});
    layout.showCreateWorkout();
  },

  showWorkout: function(workout_date) {
    const layout = this.showAndGetLayout({collection: this.collection});
    layout.showWorkoutDetail(workout_date);
  },

  editWorkout: function(workout_date) {
    const layout = this.showAndGetLayout({collection: this.collection});
    layout.showWorkoutEdit(workout_date);
  }
});

export const routes = {
  'workout/': 'listWorkout',
  'workout/create': 'createWorkout',
  'workout/:workout_date': 'showWorkout',
  'workout/:workout_date/edit': 'editWorkout'
};
