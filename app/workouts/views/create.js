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
    submit: 'saveWorkout',
    'click @ui.cancel': 'undoCreate'
  },

  modelEvents: {
    sync: 'saveComplete'
  },

  ui: {
    cancel: '.cancel-create'
  },

  saveWorkout: function(e) {
    e.preventDefault();
    console.log(Syphon.serialize(this));
    this.model.save(Syphon.serialize(this));
    console.log('saved');
  },

  undoCreate: function() {
    console.log('undo');
  },

  saveComplete: function() {
    log('syncComplete');
  }
});
