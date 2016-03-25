import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import {UserModel} from './base/models/auth';


const Nav = Marionette.View.extend({
  className: 'container-fluid',
  template: require('./templates/nav.html'),

  ui: {
    root: '.root',
    exercise: '.exercise',
    workout: '.workout',
    logout: '.logout',
    profile: '.profile',
    onlyLoggedIn: '.authenticated'
  },

  events: {
    'click @ui.root': 'showRoot',
    'click @ui.exercise': 'showExercise',
    'click @ui.workout': 'showWorkout',
    'click @ui.profile': 'showProfile',
    'click @ui.logout': 'logout'
  },

  modelEvents: {
    sync: 'render',
    'change:token': 'render',
    logout: 'showRoot'
  },

  onRender: function() {
    if (this.model.isLoggedIn()) {
      this.ui.onlyLoggedIn.removeClass('hidden');
    }
    else {
      this.ui.onlyLoggedIn.addClass('hidden');
    }
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

  logout: function(e) {
    e.preventDefault();
    this.model.logout();
  },

  showProfile: function(e) {
    e.preventDefault();
    this._navigate('profile');
  },

  _navigate: function(url) {
    Backbone.history.navigate(url, {trigger: true});
  }
});

const Layout = Marionette.View.extend({
  channelName: 'auth',

  template: require('./templates/base.html'),

  regions: {
    main: '#main',
    nav: '#nav'
  },

  radioEvents: {
    'token:invalid': 'clearLogin'
  },

  initialize: function() {
    this.model = new UserModel();
    this.model.fetch();
  },

  onRender: function() {
    this.showChildView('nav', new Nav({
      model: this.model
    }));
  },

  clearLogin: function() {
    this.model.clear();
    const channel = this.getChannel();
    channel.request('show:login');
  }
});

export default new Layout();
