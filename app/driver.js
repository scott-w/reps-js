import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import root from './root';
import {Controller as Default, routes as defaultRoutes} from './default/router';

const processRoutes = function() {
  var router = new Marionette.AppRouter();
  router.processAppRoutes(new Default(), defaultRoutes);
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
