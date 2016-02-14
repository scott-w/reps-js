import moment from 'moment';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

export default Backbone.Model.extend({
  idAttribute: 'workout_date',
  sync: authSync,

  formatDate: function() {
    return moment(this.get('workout_date')).fromNow();
  },

  displayUrl: function() {
    return `/workout/${this.get('workout_date')}`;
  }
});
