import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import moment from 'moment';

import {SetList} from '../collections/exercises';


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
      formatDate: (workout_date) => moment(workout_date).format('YYYY-MM-DD')
    };
  }
});

const SetListView = Marionette.CollectionView.extend({
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

const ExerciseContainerView = Marionette.View.extend({
  className: 'col-lg-4',
  template: require('../templates/exercises/container.html'),

  regions: {
    sets: {
      selector: '.set-list-hook',
      replaceElement: true
    }
  },

  onRender: function() {
    this.showChildView('sets', new SetListView({
      collection: this.collection
    }));
  },

  templateContext: function() {
    const panelIndexes = {
      0: 'info',
      1: 'danger',
      2: 'warning',
      3: 'success',
      4: 'default'
    };
    const length = _.keys(panelIndexes).length;
    return {
      panel: () => panelIndexes[this.getOption('index') % length]
    };
  }
});

const ExerciseListView = Marionette.CollectionView.extend({
  className: 'row',
  childView: ExerciseContainerView,

  childViewOptions: function(model, index) {
    return {
      index: index,
      collection: new SetList(model.get('sets'))
    };
  }
});

export const ExerciseLayoutView = Marionette.View.extend({
  className: 'col-md-12 col-lg-10 col-lg-offset-1',
  template: require('../templates/exercises/layout.html'),

  regions: {
    list: {
      selector: '.exercise-list-hook',
      replaceElement: true
    }
  },

  ui: {
    search: '.exercise_name'
  },

  events: {
    'input @ui.search': 'filterExercises'
  },

  onRender: function() {
    this.showChildView('list', new ExerciseListView({
      collection: this.collection
    }));
  },

  filterExercises: _.debounce(function() {
    this.model.set(Syphon.serialize(this));
    this.collection.fetch();
  }, 300)
});
