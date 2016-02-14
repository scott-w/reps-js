import Marionette from 'backbone.marionette';

const WorkoutItem = Marionette.View.extend({
  className: 'col-md-6 col-lg-4 col-sm-12',

  template: require('../templates/workout/item.html'),

  templateHelpers: function() {
    console.log(this.getOption('index'));
    return {
      iterType: 'success'
    };
  }
});

const WorkoutListView = Marionette.CollectionView.extend({
  childView: WorkoutItem
});

export const WorkoutList = Marionette.View.extend({
  className: 'col-sm-12 col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1',
  template: require('../templates/workout/layout.html'),

  regions: {
    list: '.list-hook'
  },

  ui: {
    create: '.create-workout'
  },

  triggers: {
    'click @ui.create': 'show:create:workout'
  },

  onRender: function() {
    this.showChildView('list', new WorkoutListView({
      collection: this.collection
    }));
  }
});
