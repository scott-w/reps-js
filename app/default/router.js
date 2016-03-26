import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import {UserModel} from '../base/models/auth';

import {Layout} from './views/home';
import root from '../root';


export const Controller = Marionette.Object.extend({
  channelName: 'auth',

  radioRequests: {
    'show:login': 'login'
  },

  radioEvents: {
    'token:invalid': 'clearLogin'
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
  },

  clearLogin: function() {
    const user = new UserModel();
    const channel = Radio.channel('notification');

    user.fetch();
    user.clear();

    channel.request(
      'show:warning',
      'Your login session has expired. Please login again.');
    this.login();
  }
});


export const routes =  {
  '': 'default',
  'login': 'login',
  'register': 'register'
};
