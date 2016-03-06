import {BaseController} from '../base/controller';

import {ExerciseLayout} from './views/base';

export const Controller = BaseController.extend({
  layoutView: ExerciseLayout,

  listExercise: function() {
    const layout = this.showAndGetLayout();
    layout.showExerciseList();
  },

  showExercise: function() {

  }
});

export const routes = {
  'exercise/': 'listExercise',
  'exercise/:exercise': 'showExercise'
};
