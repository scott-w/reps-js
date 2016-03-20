import _ from 'underscore';
import Marionette from 'backbone.marionette';

import {Layout} from './views/home';
import root from '../root';


export const Controller = Marionette.Object.extend({
  channelName: 'auth',

  initialize: function() {
    const channel = this.getChannel();
    this.listenTo(channel, 'token:invalid', this.login);
  },

  default: function() {
    const layout = this.showAndGetLayout();
    layout.showIndex();
  },

  login: function() {
    const layout = this.showAndGetLayout();
    layout.showLogin();
  },

  register: function() {
    const layout = this.showAndGetLayout();
    layout.showRegister();
  },

  showingMyView: function() {
    const view = root.getChildView('main');
    const cid = this.getOption('indexCid');
    if (_.isUndefined(cid)) {
      return false;
    }
    return view.cid === cid;
  },

  showAndGetLayout: function() {
    if (this.showingMyView()) {
      return root.getChildView('main');
    }
    const layout = new Layout();
    root.showChildView('main', layout);
    return layout;
  }
});


export const routes =  {
  '': 'default',
  'login': 'login',
  'register': 'register'
};
