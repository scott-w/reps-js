import _ from 'underscore';
import {Behavior} from 'backbone.marionette';

export const Validation = Behavior.extend({
  channelName: 'notification',

  modelEvents: {
    error: 'showFieldErrors',
    invalid: 'showErrorMessage'
  },

  showErrorMessage: function() {
    const channel = this.getChannel();
    channel.request(
      'show:warning', 'You have not completed the form correctly');
  }
});

export const FormError = Behavior.extend({
  modelEvents: {
    error: 'showFieldErrors'
  },

  options: {
    errors: {}
  },

  ui: function() {
    return this.getOption('errors');
  },

  showFieldErrors: function(model, response) {
    _.each(response.body, (value, attribute) => {
      const ui = this.getUI(attribute);
      // TODO Render an error tooltip
      if (_.isArray(value)) {
        value = value[0];
      }
      ui.tooltip(value);
    });
  }
});
