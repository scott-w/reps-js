import {Model} from 'backbone';

export const Notification = Model.extend({
  defaults: {
    alert_text: '',
    alert_type: ''
  },

  getAlertType: function() {
    return this.get('alert_type');
  }
});
