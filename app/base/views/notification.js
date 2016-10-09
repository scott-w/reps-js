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
  },

  ui: {
    closeButton: '.close'
  },

  events: {
    'click @ui.closeButton': 'remove'
  },

  remove: function() {
    this.model.destroy();
  }
});

export const NotificationView = Marionette.CollectionView.extend({
  childView: Notification,

  channelName: 'notification',

  radioRequests: {
    'show:success': 'showSuccess',
    'show:error': 'showError',
    'show:warning': 'showWarning',
    'clear:success': 'clearSuccess',
    'clear:error': 'clearError',
    'clear:warning': 'clearWarning',
    'clear:all': 'clearAll'
  },

  initialize: function() {
    const channel = Radio.channel(this.channelName);
    Marionette.bindRequests(this, channel, this.radioRequests);
  },

  showSuccess: function(msg) {
    this.collection.addSuccessMsg(msg);
  },

  showError: function(msg) {
    this.collection.addErrorMsg(msg);
  },

  showWarning: function(msg) {
    this.collection.addWarningMsg(msg);
  },

  clearSuccess: function() {
    this.collection.clearSuccessMessages();
  },

  clearError: function() {
    this.collection.clearErrorMessages();
  },

  clearWarning: function() {
    this.collection.clearWarningMessages();
  },

  clearAll: function() {
    this.collection.clearAllMessages();
  }
});
