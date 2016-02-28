import _ from 'underscore';
import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';


/** Grab a list of locally stored identifiers to be subsequently pulled from the
    localStorage database.
*/
export const LocalModel = Backbone.Model.extend({
  idAttribute: 'modelname',
  localStorage: new LocalStorage('LocalData'),

  defaults: function() {
    return {
      data: []
    };
  },

  addId: function(id) {
    const data = this.get('data');
    this.save({
      data: _.union(data, [id])
    });
  },

  popId: function(id) {
    const data = this.get('data');
    this.save({
      data: _.without(data, id)
    });
  },

  getIds: function() {
    return this.get('data');
  }
});
