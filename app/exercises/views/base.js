import Marionette from 'backbone.marionette';

import {SearchModel} from '../models/search';
import {ExerciseList} from '../collections/exercises';
import {ExerciseLayoutView as ExerciseListView} from './list';


export const ExerciseLayout = Marionette.View.extend({
  template: require('../templates/base.html'),
  regions: {
    main: '.layout-hook'
  },

  initialize: function() {
    this.model = new SearchModel();
    this.collection = new ExerciseList(null);
    this.collection.fetch();
  },

  showExerciseList: function() {
    this.showChildView('main', new ExerciseListView({
      collection: this.collection,
      model: this.model
    }));
  }
});
