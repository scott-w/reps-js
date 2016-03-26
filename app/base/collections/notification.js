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
  }
});
