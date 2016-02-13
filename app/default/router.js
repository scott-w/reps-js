import Marionette from 'backbone.marionette';

import {Index} from './views/home';
import root from '../root';


export const Controller = Marionette.Object.extend({
  default: function() {
    console.log('default');
    root.showChildView('main', new Index());
  },

  login: function() {

  }
});


export const routes =  {
  '': 'default',
  'login': 'login'
};
