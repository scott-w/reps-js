import _ from 'underscore';
import {Behavior} from 'backbone.marionette';
import popoverTemplate from '../templates/popover.html';

/** Handles client-side validation and displays any errors found in the global
    notification bar
*/
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

/** The FormError is able to display popovers on a form from the server.
    To use it, just pass an object of:
      serverField -> input-selector
    and this will render the popover next to it.
*/
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

  /** Renders each field error received from the server in a popover */
  showFieldErrors: function(model, response) {
    _.each(response.responseJSON, (value, attribute) => {
      const ui = this.getUI(attribute);

      if (_.isArray(value)) {
        value = value[0];
      }
      const output = this.getPopoverTemplate(value);
      ui.parent().append(output);
    });
  },

  /** Destroys all popovers */
  hidepopover: function() {
    this.$('.form-error').remove();
  },

  /** Gets a rendered template of the popover to display */
  getPopoverTemplate: function(content) {
    return popoverTemplate({content: content});
  }
});
