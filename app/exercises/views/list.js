import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {Page} from '../../base/behaviors/page';

import {SetList} from '../../sets/collections/sets';

import {SetListView} from './set';


export const ExerciseContainerView = Marionette.View.extend({
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
      collection: model.getSetSummary(SetList)
    };
  }
});

export const ExerciseLayoutView = Marionette.View.extend({
  behaviors: {
    page: Page
  },

  className: 'col-md-12 col-lg-10 col-lg-offset-1',
  template: require('../templates/exercises/layout.html'),

  regions: {
    list: {
      selector: '.exercise-list-hook',
      replaceElement: true
    }
  },

  ui: {
    search: '.exercise_name',
    create: '.start-session'
  },

  events: {
    'input @ui.search': 'filterExercises',
    'click @ui.create': 'showCreate'
  },

  onRender: function() {
    this.showChildView('list', new ExerciseListView({
      collection: this.collection
    }));
  },

  filterExercises: _.debounce(function() {
    this.model.set(Syphon.serialize(this));
    this.collection.fetch();
  }, 300),

  showCreate: function(e) {
    e.preventDefault();
    Backbone.history.navigate('workout/create', {trigger: true});
  }
});
