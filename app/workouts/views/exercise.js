import Marionette from 'backbone.marionette';


const SetView = Marionette.View.extend({
  template: require('../templates/workout/set.html')
});

const SetListView = Marionette.CollectionView.extend({
  childView: SetView
});

export const ExerciseListView = Marionette.CollectionView.extend({
  childView: SetListView
});
