import moment from 'moment';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: 'workout_date',

  formatDate: function() {
    return moment(this.get('workout_date')).fromNow();
  },

  displayUrl: function() {
    return `/workout/${this.get('workout_date')}`;
  }
});
