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


const _BaseValidationBehavior = Behavior.extend({
  options: {
    errors: {},
    popoverClass: '.form-error'
  },

  ui: function() {
    return this.getOption('errors');
  },

  events: {
    'click': 'hidepopover',
    'keydown': 'hidepopover'
  },

  /** Destroys all popovers */
  hidepopover: function() {
    const formError = this.getOption('popoverClass');
    this.$(formError).remove();
  },

  /** Gets a rendered template of the popover to display */
  getPopoverTemplate: function(content) {
    return popoverTemplate({
      content: content,
      popoverClass: this.getOption('popoverClass')
    });
  },

  /** Render the error against the UI referenced by key */
  showError: function(value, attribute) {
    const ui = this.getUI(attribute);

    if (_.isArray(value)) {
      value = value[0];
    }
    const output = this.getPopoverTemplate(value);
    ui.parent().append(output);
  }
});


/** Display validation errors from the model on the view as popovers.
    To use this, just pass an object of:
      modelField -> input-selector
    and this will render the popover next to the field.

    This is used for client-thrown invalidation errors.
    For this to work, `model.validate` must return an object - this will do
    nothing if any other type is returned e.g. array or string
*/
export const ValidationError = _BaseValidationBehavior.extend({
  modelEvents: {
    invalid: 'showFieldErrors'
  },

  showFieldErrors: function(model, errors) {
    _.each(errors, this.showError, this);
  }
});


/** The FormError is able to display popovers on a form from the server.
    To use it, just pass an object of:
      serverField -> input-selector
    and this will render the popover next to it.

    This will render the server-sent validation errors.
*/
export const FormError = _BaseValidationBehavior.extend({
  modelEvents: {
    error: 'showFieldErrors'
  },

  /** Renders each field error received from the server in a popover */
  showFieldErrors: function(model, response) {
    _.each(response.responseJSON, this.showError, this);
  }
});
