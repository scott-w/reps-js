import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import {ExerciseList} from '../collections/workouts';
import {ExerciseListView} from './exercise';


const WorkoutView = Marionette.View.extend({
  className: 'col-md-12',
  template: require('../templates/workout/detail.html'),

  regions: {
    exercises: '.exercise-list-hook'
  },

  modelEvents: {
    sync: 'render'
  },

  templateContext: function() {
    return {
      formattedDate: this.model.formatDate(),
      editUrl: `${this.model.displayUrl()}/edit`
    };
  },

  onRender: function() {
    this.showChildView('exercises', new ExerciseListView({
      collection: new ExerciseList(this.model.getExercises())
    }), {replaceElement: true});
  }
});

const WorkoutItem = Marionette.View.extend({
  className: 'col-md-6 col-lg-4 col-sm-12',

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
      location: location ? location.name : '-'
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

  regions: {
    list: '.workouts-list'
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
  },

  onChildviewShowWorkout: function(options) {
    this.triggerMethod('show:workout', options);
  },

  onShowCreateWorkout: function() {
    Backbone.history.navigate('workout/create');
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
    this.showChildView('list', new WorkoutListLayout({
      collection: this.collection
    }));
  },

  showWorkout: function(model) {
    model.getWorkout();
    this.showChildView(
      'list', new WorkoutView({model: model}),
      {replaceElement: true}
    );
    Backbone.history.navigate(model.displayUrl());
  },

  onChildviewShowWorkout: function(options) {
    this.showWorkout(options.model);
  },

  onChildviewShowCreateWorkout: function() {
    this.triggerMethod('show:create:workout');
  }
});
