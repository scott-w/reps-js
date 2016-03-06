import {BaseController} from '../base/controller';

import {UserLayout} from './views';
import {UserModel} from '../base/models/auth';


export const Controller = BaseController.extend({
  layoutView: UserLayout,

  initialize: function() {
    const model = new UserModel();
    model.fetch();

    this.options.layoutOptions = {
      model: model
    };
  },

  showProfile: function() {
    this.showAndGetLayout();
  }
});

export const routes = {
  'profile': 'showProfile'
};
