/** The Homepage
*/
import Marionette from 'backbone.marionette';


export const Index = Marionette.View.extend({
  className: 'row',
  template: require('../templates/default.html'),

  ui: {
    login: '.login-button'
  },

  events: {
    'click @ui.login': 'showLogin'
  },

  showLogin: function() {

  }
});

export const Login = Marionette.View.extend({
  className: 'row',
  template: require('../templates/auth/layout.html')
});
