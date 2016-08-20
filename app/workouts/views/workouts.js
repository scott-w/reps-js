import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Bricks from 'bricks.js';

import {Page} from '../../base/behaviors/page';
import {Loading} from '../../base/behaviors/loader';

import {EmptyView, LoaderView} from '../../base/views/loader';

import {ExerciseList} from '../collections/workouts';
import {ExerciseListView} from './exercise';


/** Preview the Workout with links to edit.
*/
const WorkoutDetailView = Marionette.View.extend({
  className: 'col-md-12',
  template: require('../templates/workout/detail.html'),

  regions: {
    exercises: '.exercise-list-hook'
  },

  modelEvents: {
    sync: 'render'
  },

  ui: {
    back: '.go-back',
    edit: '.edit-workout'
  },

  triggers: {
    'click @ui.back': 'show:list',
    'click @ui.edit': 'show:edit'
  },

  templateContext: function() {
    return {
      formattedDate: this.model.formatDate(),
      editUrl: this._editUrl()
    };
  },

  onRender: function() {
    this.showChildView('exercises', new ExerciseListView({
      collection: new ExerciseList(this.model.getExercises())
    }), {replaceElement: true});
  },

  onShowList: function() {
    Backbone.history.navigate('workout/');
  },

  onShowEdit: function() {
    Backbone.history.navigate(this._editUrl());
  },

  _editUrl: function() {
    return `${this.model.displayUrl()}/edit`;
  }
});

const WorkoutItem = Marionette.View.extend({
  template: require('../templates/workout/item.html'),

  templateContext: function() {
    const panelIndexes = {
      0: 'info',
      1: 'danger',
      2: 'warning',
      3: 'success',
      4: 'default'
    };
    const location = this.model.get('location');

    return {
      iterType: panelIndexes[this.getOption('index') % 5],
      formattedDate: () => this.model.formatDate(),
      location: location ? location.name : '-',
      summary: this.model.getSummary()
    };
  },

  triggers: {
    click: 'show:workout'
  }
});

const WorkoutListView = Marionette.CollectionView.extend({
  childView: WorkoutItem,

  childViewOptions: function(model, index) {
    return {
      index: index
    };
  }
});

const WorkoutListLayout = Marionette.View.extend({
  template: require('../templates/workout/list.html'),

  behaviors: {
    page: Page,
    loader: {
      behaviorClass: Loading,
      collectionView: WorkoutListView,
      emptyView: EmptyView,
      loadView: LoaderView
    }
  },

  regions: {
    list: '.workouts-list'
  },

  ui: {
    create: '.create-workout'
  },

  triggers: {
    'click @ui.create': 'show:create:workout'
  },

  onChildviewShowWorkout: function(options) {
    this.triggerMethod('show:workout', options);
  },

  onShowCreateWorkout: function() {
    Backbone.history.navigate('workout/create');
  },

  onAttach: function() {
    const bricks = new Bricks({
      container: '.workouts-list',
      packed: 'packed',
      sizes: [
        { columns: 3, gutter: 10 },
        { mq: '768px', columns: 3, gutter: 30 },
        { mq: '1024px', columns: 3, gutter: 30 }
      ]
    });
    bricks.pack();
  }
});

export const WorkoutList = Marionette.View.extend({
  template: require('../templates/workout/layout.html'),

  regions: {
    list: {
      selector: '.list-hook',
      replaceElement: true
    }
  },

  onRender: function() {
    this.showList();
  },

  showList: function() {
    this.showChildView('list', new WorkoutListLayout({
      collection: this.collection
    }));
  },

  showWorkout: function(model) {
    model.getWorkout();
    this.showChildView(
      'list', new WorkoutDetailView({model: model}),
      {replaceElement: true}
    );
    Backbone.history.navigate(model.displayUrl());
  },

  onChildviewShowWorkout: function(options) {
    this.showWorkout(options.model);
  },

  onChildviewShowList: function() {
    this.showList();
  },

  onChildviewShowCreateWorkout: function() {
    this.triggerMethod('show:create:workout');
  },

  onChildviewShowEdit: function(options) {
    this.triggerMethod('show:edit', options.model);
  }
});
