import {BaseController} from '../base/controller';

import {BaseView} from './views';


export const Controller = BaseController.extend({
  showProfile: function() {

  }
});

export const routes = {
  'profile': 'showProfile'
};
