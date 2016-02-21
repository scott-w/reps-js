import Marionette from 'backbone.marionette';


const ExerciseContainerView = Marionette.View.extend({
  className: 'col-lg-4',
  template: require('../templates/exercises/container.html'),

  regions: {
    sets: {
      selector: '.set-list-hook',
      replaceElement: true
    }
  }
});

const ExerciseListView = Marionette.CollectionView.extend({
  childView: ExerciseContainerView
});

export const ExerciseLayoutView = Marionette.View.extend({
  className: 'col-md-12',
  template: require('../templates/exercises/layout.html'),

  regions: {
    list: '.exercise-list-hook'
  },

  onRender: function() {
    this.showChildView('list', new ExerciseListView({
      collection: this.collection
    }));
  }
});
