import Backbone from 'backbone';

import moment from 'moment';


export const SetModel = Backbone.Model.extend({
  defaults: {
    'workout_date': ''
  },

  formatDate: function() {
    return moment(this.get('workout_date')).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
  }
});
