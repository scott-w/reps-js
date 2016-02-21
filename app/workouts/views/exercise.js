import _ from 'underscore';
import Marionette from 'backbone.marionette';

import {SetList} from '../collections/workouts';


export const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/workout/set.html')
});

export const SetListView = Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'list-group',
  childView: SetView
});

const SetContainerView = Marionette.View.extend({
  template: require('../templates/workout/exercise.html'),
  className: 'col-lg-3',

  regions: {
    sets: {
      selector: 'ol',
      replaceElement: true
    }
  },

  onRender: function() {
    this.showChildView('sets', new SetListView({
      collection: this.collection
    }));
  },

  templateContext: function() {
    const panelIndexes = {
      0: 'info',
      1: 'danger',
      2: 'warning',
      3: 'success',
      4: 'default'
    };
    const length = _.keys(panelIndexes).length;

    return {
      panel: () => panelIndexes[this.getOption('index') % length]
    };
  }
});

export const ExerciseListView = Marionette.CollectionView.extend({
  childView: SetContainerView,

  childViewOptions: function(model, index) {
    return {
      collection: new SetList(model.get('sets')),
      index: index
    };
  }
});
