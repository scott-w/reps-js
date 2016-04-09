import Marionette from 'backbone.marionette';
import moment from 'moment';


export const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/exercises/set.html'),

  templateContext: function() {
    return {
      isFirstDate: (workout_date) =>
        this.getOption('firstDate') === moment(workout_date).format('YYYY-MM-DD'),
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
    let firstDate = null;
    if (first) {
      firstDate = moment(first.get('workout_date')).format('YYYY-MM-DD');
    }

    return {
      firstDate: firstDate
    };
  }
});
