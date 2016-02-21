import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import root from './root';

import {Controller as Default, routes as defaultRoutes} from './default/router';

import {
  Controller as Workout, routes as workoutRoutes
} from './workouts/router';

import {
  Controller as Exercise, routes as exerciseRoutes
} from './exercises/router';

const processRoutes = function() {
  var router = new Marionette.AppRouter();
  router.processAppRoutes(new Default(), defaultRoutes);
  router.processAppRoutes(new Workout(), workoutRoutes);
  router.processAppRoutes(new Exercise(), exerciseRoutes);
};

const App = new Marionette.Application({
  region: '#root',

  onStart: function() {
    this.showView(root);
    processRoutes();

    Backbone.history.start({pushState: true});
  }
});

App.start();
