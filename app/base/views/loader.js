import Mn from 'backbone.marionette';


export const EmptyView = Mn.View.extend({
  template: require('../templates/empty.html')
});


export const LoaderView = Mn.View.extend({
  template: require('../templates/loader.html'),
  className: 'uil-ring-css',
  attributes: {
    style: 'transform:scale(0.77);'
  }
});
