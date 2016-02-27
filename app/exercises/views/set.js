import Marionette from 'backbone.marionette';
import moment from 'moment';


export const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/exercises/set.html'),

  templateContext: function() {
    const firstDate = this.getOption('firstDate');
    return {
      isFirstDate: function(workout_date) {
        return moment(firstDate).format('YYYY-MM-DD') ===
          moment(workout_date).format('YYYY-MM-DD');
      },
      formatDate: () => this.model.formatDate()
    };
  }
});

export const SetListView = Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'list-group',
  childView: SetView,

  childViewOptions: function() {
    const first = this.collection.at(0);

    return {
      firstDate: first ? first.get('workout_date') : null
    };
  }
});
