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
  'workout/create': 'createWorkout'
};
