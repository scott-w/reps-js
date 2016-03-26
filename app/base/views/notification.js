import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';


const Notification = Marionette.View.extend({
  template: require('../templates/notification.html'),

  className: function() {
    const alertType = this.model.getAlertType();
    return `alert alert-${alertType} alert-dismissable`;
  },

  attributes: {
    role: 'alert'
  }
});

export const NotificationView = Marionette.CollectionView.extend({
  childView: Notification,

  channelName: 'notification',

  radioRequests: {
    'show:success': 'showSuccess',
    'show:error': 'showError',
    'show:warning': 'showWarning'
  },

  initialize: function() {
    const channel = Radio.channel(this.channelName);
    Marionette.bindRadioRequests(this, channel, this.radioRequests);
  },

  showSuccess: function(msg) {
    this.collection.addSuccessMsg(msg);
  },

  showError: function(msg) {
    this.collection.addErrorMsg(msg);
  },

  showWarning: function(msg) {
    this.collection.addWarningMsg(msg);
  }
});
