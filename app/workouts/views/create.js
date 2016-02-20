import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {SetModel} from '../models/workout';
import {SetList} from '../collections/workouts';
import {SetListView} from './exercise';

const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/create/set.html')
});

const SmallSetListView = SetListView.extend({
  childView: SetView
});

const SetLayoutView = Marionette.View.extend({
  tagName: 'form',

  attributes: {
    method: 'post',
    action: ''
  },

  template: require('../templates/create/setform.html'),

  ui: {
    initial: '#id_weight'
  },

  regions: {
    list: '.setlist-hook'
  },

  events: {
    submit: 'addSet'
  },

  modelEvents: {
    change: 'render refocus'
  },

  collectionEvents: {
    add: 'fetchIds'
  },

  onRender: function() {
    if (this.getRegion('list').hasView()) {
      return;
    }
  },

  addSet: function(e) {
    e.preventDefault();
    this.model.set(Syphon.serialize(this));

    if (this.model.isValid()) {
      this.collection.add(this.model.pick('exercise_name', 'weight', 'reps'));
      this.model.clearExerciseAttrs();
    }
  },

  refocus: function() {
    this.ui.initial.focus();
  },

  fetchIds: function(model, collection) {
    collection.setExerciseIds();
    if (!model.get('exercise')) {
      model.fetchExercise({
        success: () => collection.setExerciseIds()
      });
    }
  }
});

export const CreateWorkout = Marionette.View.extend({
  template: require('../templates/create/layout.html'),

  events: {
    'click @ui.save': 'saveWorkout'
  },

  triggers: {
    'click @ui.cancel': 'show:list'
  },

  modelEvents: {
    sync: 'saveComplete'
  },

  ui: {
    cancel: '.cancel-create',
    save: '.save-workout'
  },

  regions: {
    setForm: '.setform-hook',
    setList: '.setlist-hook'
  },

  initialize: function() {
    this.collection = new SetList(null);
  },

  onRender: function() {
    this.showChildView('setForm', new SetLayoutView({
      model: new SetModel(),
      collection: this.collection
    }));
    this.showChildView('setList', new SmallSetListView({
      collection: this.collection
    }));
  },

  saveWorkout: function(e) {
    e.preventDefault();
    const data = Syphon.serialize(this);
    this.model.save({
      workout_date: data.workout_date,
      sets: this.collection
    });
  },

  saveComplete: function() {
    this.triggerMethod('add:to:collection', this.model);
    this.triggerMethod('show:list');
  },

  onShowList: function() {
    Backbone.history.navigate('workout/');
  }
});
