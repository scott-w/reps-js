import Marionette from 'backbone.marionette';

import {SearchModel} from '../models/search';
import {ExerciseLayoutView as ExerciseListView} from './list';


export const ExerciseLayout = Marionette.View.extend({
  template: require('../templates/base.html'),
  regions: {
    main: '.layout-hook'
  },

  initialize: function() {
    this.model = new SearchModel();
  },

  onRender: function() {
    this.collection.fetch();
  },

  showExerciseList: function() {
    this.showChildView('main', new ExerciseListView({
      collection: this.collection,
      model: this.model
    }));
  }
});
