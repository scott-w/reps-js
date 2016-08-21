import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {Page} from '../../base/behaviors/page';
import {Loading} from '../../base/behaviors/loader';

import {EmptyView, LoaderView} from '../../base/views/loader';

import {ExerciseList} from '../collections/exercises';
import {SetList} from '../../sets/collections/sets';

import {SetListView} from './set';


export const ExerciseContainerView = Marionette.View.extend({
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
  className: 'col-lg-4',
  childView: ExerciseContainerView,

  childViewOptions: function(model, index) {
    return {
      index: index,
      collection: model.getSetSummary(SetList)
    };
  }
});

const ExerciseColumnsView = Marionette.View.extend({
  className: 'row',
  template: require('../templates/exercises/columns.html'),

  collectionEvents: {
    update: 'updateColumns'
  },

  regions: {
    col1: '.col1-hook',
    col2: '.col2-hook',
    col3: '.col3-hook'
  },

  onRender: function() {
    this.showColumns();
  },

  showColumns: function() {
    const column1 = this.collection.filter((model, index) => index % 3 === 0);
    const column2 = this.collection.filter((model, index) => index % 3 === 1);
    const column3 = this.collection.filter((model, index) => index % 3 === 2);

    this.showChildView('col1', new ExerciseListView({
      collection: new ExerciseList(column1)
    }));

    this.showChildView('col2', new ExerciseListView({
      collection: new ExerciseList(column2)
    }));

    this.showChildView('col3', new ExerciseListView({
      collection: new ExerciseList(column3)
    }));
  },

  updateColumns: function() {
    this.updateColumn(1);
    this.updateColumn(2);
    this.updateColumn(3);
  },

  updateColumn: function(column) {
    const region = `col${column}`;

    if (!this.hasRegion(region)) {
      return;  // Probably not initialized
    }

    const remainder = column - 1;
    const collection = this.collection.filter(
      (model, index) => index % 3 === remainder);

    const child = this.getChildView(region);
    child.collection.set(collection);
  }
});

export const ExerciseLayoutView = Marionette.View.extend({
  behaviors: {
    page: Page,
    loader: {
      behaviorClass: Loading,
      collectionView: ExerciseColumnsView,
      loadView: LoaderView,
      emptyView: EmptyView
    }
  },

  className: 'col-md-12 col-lg-10 col-lg-offset-1',
  template: require('../templates/exercises/layout.html'),

  regions: {
    list: {
      selector: '.exercise-list-hook',
      replaceElement: true
    }
  },

  childViewEvents: {
    'page:change': 'updateColumns'
  },

  ui: {
    search: '.exercise_name',
    create: '.start-session'
  },

  events: {
    'input @ui.search': 'filterExercises',
    'click @ui.create': 'showCreate'
  },

  filterExercises: _.debounce(function() {
    this.model.set(Syphon.serialize(this));
    this.collection.fetch();
  }, 300),

  showCreate: function(e) {
    e.preventDefault();
    Backbone.history.navigate('workout/create', {trigger: true});
  },

  updateColumns: function() {
    this.getChildView('list').updateColumns();
  }
});
