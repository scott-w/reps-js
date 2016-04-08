import {BaseController} from '../base/controller';

import {ExerciseList} from './collections/exercises';
import {ExerciseLayout} from './views/base';

export const Controller = BaseController.extend({
  layoutView: ExerciseLayout,

  initialize: function() {
    this.collection = new ExerciseList(null, {searchModel: this.model});
    this.collection.fetch();
  },

  listExercise: function() {
    const layout = this.showAndGetLayout({collection: this.collection});
    layout.showExerciseList();
  },

  showExercise: function() {

  }
});

export const routes = {
  'exercise/': 'listExercise',
  'exercise/:exercise': 'showExercise'
};
