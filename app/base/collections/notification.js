import {Collection} from 'backbone';

import {Notification} from '../models/notification';

export const NotificationList = Collection.extend({
  model: Notification,

  addSuccessMsg: function(msg) {
    this.add({
      alert_text: msg,
      alert_type: 'success'
    });
  },

  addErrorMsg: function(msg) {
    this.add({
      alert_text: msg,
      alert_type: 'error'
    });
  },

  addWarningMsg: function(msg) {
    this.add({
      alert_text: msg,
      alert_type: 'warning'
    });
  },

  clearSuccessMessages: function() {
    this._clearMessages('success');
  },

  clearErrorMessages: function() {
    this._clearMessages('error');
  },

  clearWarningMessages: function() {
    this._clearMessages('warning');
  },

  clearAllMessages: function() {
    this.set([]);
  },

  _clearMessages: function(alertType) {
    this.set(this.filter((msg) => msg.get('alert_type') !== alertType));
  }
});
