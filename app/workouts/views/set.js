import Marionette from 'backbone.marionette';

import {SetListView} from './exercise';

import {
  SetListView as PanelSetList,
  SetView as PanelSet
} from '../../exercises/views/set';


const SetView = Marionette.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: require('../templates/create/set.html'),

  modelEvents: {
    change: 'render'
  },

  triggers: {
    click: 'add:set'
  }
});

export const SmallSetListView = SetListView.extend({
  childView: SetView,

  childViewEvents: {
    'add:set': 'addSet'
  },

  addSet: function(child) {
    this.model.set(child.model.pick('exercise_name', 'weight', 'reps'));
  }
});


const PanelSetView = PanelSet.extend({
  template: require('../templates/set/panel.html'),

  triggers: {
    click: 'add:set'
  }
});

export const PanelSetListView = PanelSetList.extend({
  childView: PanelSetView
});
