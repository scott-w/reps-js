import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {SetModel} from '../models/workout';
import {SetList} from '../collections/workouts';

const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/create/set.html')
});

const SetListView = Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'list-group',
  childView: SetView
});

const SetLayoutView = Marionette.View.extend({
  template: require('../templates/create/setform.html'),

  ui: {
    form: '.set-form',
    initial: '#id_weight'
  },

  regions: {
    list: '.setlist-hook'
  },

  events: {
    'submit @ui.form': 'addSet'
  },

  modelEvents: {
    change: 'render refocus'
  },

  onRender: function() {
    if (this.getRegion('list').hasView()) {
      return;
    }
    this.showChildView('list', new SetListView({
      collection: this.collection
    }));
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
  }
});

export const CreateWorkout = Marionette.View.extend({
  template: require('../templates/create/layout.html'),

  events: {
    'submit @ui.form': 'saveWorkout'
  },

  triggers: {
    'click @ui.cancel': 'show:list'
  },

  modelEvents: {
    sync: 'saveComplete'
  },

  ui: {
    cancel: '.cancel-create',
    form: '.workout-form'
  },

  regions: {
    sets: '.set-hook'
  },

  onRender: function() {
    this.showChildView('sets', new SetLayoutView({
      model: new SetModel(),
      collection: new SetList(null)
    }));
  },

  saveWorkout: function(e) {
    e.preventDefault();
    this.model.save(Syphon.serialize(this));
  },

  saveComplete: function() {
    this.triggerMethod('add:to:collection', this.model);
    this.triggerMethod('show:list');
  },

  onShowList: function() {
    Backbone.history.navigate('workout/');
  }
});
