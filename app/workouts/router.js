import {BaseController} from '../base/controller';

import WorkoutList from './views/base';

export const Controller = BaseController.extend({
  layoutView: WorkoutList,

  listWorkout: function() {
    const layout = this.showAndGetLayout();
    layout.showWorkoutList();
  },

  createWorkout: function() {
    const layout = this.showAndGetLayout();
    layout.showCreateWorkout();
  },

  showWorkout: function(workout_date) {
    const layout = this.showAndGetLayout();
    layout.showWorkoutDetail(workout_date);
  },

  editWorkout: function(workout_date) {
    const layout = this.showAndGetLayout();
    layout.showWorkoutEdit(workout_date);
  }
});

export const routes = {
  'workout/': 'listWorkout',
  'workout/create': 'createWorkout',
  'workout/:workout_date': 'showWorkout',
  'workout/:workout_date/edit': 'editWorkout'
};
