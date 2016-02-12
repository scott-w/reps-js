import Marionette from 'backbone.marionette';

var Layout = Marionette.View.extend({
  className: 'container',
  template: require('./templates/base.html')
});


var App = new Marionette.Application({
  region: '#root'
});

App.on('start', function() {
  this.showView(new Layout());
});

export default App;
