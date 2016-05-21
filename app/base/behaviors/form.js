import _ from 'underscore';
import {Behavior} from 'backbone.marionette';
import popoverTemplate from '../templates/popover.html';

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

  events: {
    'click': 'hidepopover',
    'keydown': 'hidepopover'
  },

  showFieldErrors: function(model, response) {
    _.each(response.responseJSON, (value, attribute) => {
      const ui = this.getUI(attribute);

      if (_.isArray(value)) {
        value = value[0];
      }
      const output = popoverTemplate({content: value});
      ui.parent().append(output);
    });
  },

  hidepopover: function() {
    this.$('.form-error').remove();
  }
});
