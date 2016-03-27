import {Behavior} from 'backbone.marionette';

export const Validation = Behavior.extend({
  channelName: 'notification',

  modelEvents: {
    invalid: 'showErrorMessage'
  },

  showErrorMessage: function() {
    const channel = this.getChannel();
    channel.request(
      'show:warning', 'You have not completed the form correctly');
  }
});
