import _ from 'underscore';
import Marionette from 'backbone.marionette';

import root from '../root';

import {ExerciseLayout} from './views/base';

export const Controller = Marionette.Object.extend({
  listExercise: function() {
    const layout = this.showAndGetLayout();
    layout.showExerciseList();
  },

  showExercise: function() {

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
    const layout = new ExerciseLayout();
    root.showChildView('main', layout);
    return layout;
  }

});

export const routes = {
  'exercise/': 'listExercise',
  'exercise/:exercise': 'showExercise'
};
