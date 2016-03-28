import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import root from './root';

import {Controller as Default, routes as defaultRoutes} from './default/router';

import {
  Controller as Workout, routes as workoutRoutes
} from './workouts/router';

import {
  Controller as Exercise, routes as exerciseRoutes
} from './exercises/router';

import {
  Controller as User, routes as userRoutes
} from './user/router';

const processRoutes = function() {
  const router = new Marionette.AppRouter();
  router.processAppRoutes(new Default(), defaultRoutes);
  router.processAppRoutes(new Workout(), workoutRoutes);
  router.processAppRoutes(new Exercise(), exerciseRoutes);
  router.processAppRoutes(new User(), userRoutes);
  return router;
};

const App = new Marionette.Application({
  region: '#root',

  onStart: function() {
    const region = this.getRegion();
    region.$el.html('');
    region.show(root);
    const router = processRoutes();

    router.on('route', () => {
      const channel = Radio.channel('notification');
      channel.request('clear:all');
    });

    Backbone.history.start({pushState: true});
  }
});

App.start();
