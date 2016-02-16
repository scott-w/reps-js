import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

export const CreateWorkout = Marionette.View.extend({
  tagName: 'form',
  className: 'form-horizontal',
  template: require('../templates/create/layout.html'),
  attributes: {
    method: 'post'
  },

  events: {
    submit: 'saveWorkout'
  },

  triggers: {
    'click @ui.cancel': 'show:list'
  },

  modelEvents: {
    sync: 'saveComplete'
  },

  ui: {
    cancel: '.cancel-create'
  },

  saveWorkout: function(e) {
    e.preventDefault();
    this.model.save(Syphon.serialize(this));
  },

  saveComplete: function() {
    this.triggerMethod('show:list');
  },

  onShowList: function() {
    Backbone.history.navigate('workout/');
  }
});
