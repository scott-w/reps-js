import _ from 'underscore';
import Marionette from 'backbone.marionette';

import root from '../root';

import WorkoutList from './views/base';

export const Controller = Marionette.Object.extend({
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
  },

  showingMyView: function() {
    const view = root.getChildView('main');
    const cid = this.getOption('indexCid');
    if (_.isUndefined(cid)) {
      return false;
    }
    return view.cid === cid;
  },

  showAndGetLayout: function() {
    if (this.showingMyView()) {
      return root.getChildView('main');
    }
    const layout = new WorkoutList();
    root.showChildView('main', layout);
    return layout;
  }

});

export const routes = {
  'workout/': 'listWorkout',
  'workout/create': 'createWorkout',
  'workout/:workout_date': 'showWorkout',
  'workout/:workout_date/edit': 'editWorkout'
};
