import _ from 'underscore';
import Marionette from 'backbone.marionette';

import {SetList} from '../collections/exercises';


export const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/exercises/set.html'),

  templateContext: function() {
    return {

    };
  }
});

const SetListView = Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'list-group',
  childView: SetView,

  childViewOptions: function() {
    return {
    };
  }
});

const ExerciseContainerView = Marionette.View.extend({
  className: 'col-lg-4',
  template: require('../templates/exercises/container.html'),

  regions: {
    sets: {
      selector: '.set-list-hook',
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

const ExerciseListView = Marionette.CollectionView.extend({
  className: 'row',
  childView: ExerciseContainerView,

  childViewOptions: function(model, index) {
    return {
      index: index,
      collection: new SetList(model.get('sets'))
    };
  }
});

export const ExerciseLayoutView = Marionette.View.extend({
  className: 'col-md-12 col-lg-10 col-lg-offset-1',
  template: require('../templates/exercises/layout.html'),

  regions: {
    list: {
      selector: '.exercise-list-hook',
      replaceElement: true
    }
  },

  onRender: function() {
    this.showChildView('list', new ExerciseListView({
      collection: this.collection
    }));
  }
});
