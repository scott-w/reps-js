import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

const Nav = Marionette.View.extend({
  className: 'container-fluid',
  template: require('./templates/nav.html'),

  ui: {
    root: '.root',
    exercise: '.exercise',
    workout: '.workout'
  },

  events: {
    'click @ui.root': 'showRoot',
    'click @ui.exercise': 'showExercise',
    'click @ui.workout': 'showWorkout'
  },

  showRoot: function() {
    this._navigate('');
  },

  showExercise: function(e) {
    e.preventDefault();
    this._navigate('exercise/');
  },

  showWorkout: function(e) {
    e.preventDefault();
    this._navigate('workout/');
  },

  _navigate: function(url) {
    Backbone.history.navigate(url, {trigger: true});
  }
});

const Layout = Marionette.View.extend({
  template: require('./templates/base.html'),

  regions: {
    main: '#main',
    nav: '#nav'
  },

  onRender: function() {
    this.showChildView('nav', new Nav());
  }
});

export default new Layout();
