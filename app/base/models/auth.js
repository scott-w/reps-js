import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';


export const UserModel = Backbone.Model.extend({
  localStorage: new LocalStorage('UserModel'),
  defaults: {
    id: 'current',
    first_name: '',
    last_name: '',
    email: '',
    token: ''
  }
});


export const authSync = function(method, model_or_collection, options) {
  const user = new UserModel();
  user.fetch({
    success: () => {
      const token = user.get('token');
      if (token) {
        if (_.isUndefined(options.headers)) {
          options.headers = {};
        }
        _.extend(options.headers, {Authorization: `Bearer ${token}`});
      }
      Backbone.sync(method, model_or_collection, options);
    }
  });
};
