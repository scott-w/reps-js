import expect from 'expect.js';

import {Model} from 'backbone';
import {View} from 'backbone.marionette';

import {FormError} from '../../app/base/behaviors/form';


describe('Error handler', function() {
  let model;

  const MyView = View.extend({
    behaviors: {
      error: FormError
    },

    ui: {
      my_attribute: '.attribute'
    }
  });
  let view;
  let tooltip;

  beforeEach(function() {
    model = new Model({
      my_attribute: 'My Value'
    });

    view = new MyView({model: model});

    tooltip = sinon.stub();

    sinon.stub(view, 'getUI', () => ({
        tooltip: tooltip
    }));
  });

  afterEach(function() {
    view.getUI.restore();
    model = null;
    view = null;
    tooltip = null;
  });

  it('fires error handlers on the view', function() {
    model.trigger('error', model, {
      body: {
        my_attribute: ['Was not valid']
      }
    });

    expect(view.getUI.calledWith('my_attribute')).to.equal(true);
    expect(tooltip.calledWith('Was not valid')).to.equal(true);
  });

  it('handles non-array error objects', function() {
    model.trigger('error', model, {
      body: {
        my_attribute: 'Was not valid'
      }
    });

    expect(view.getUI.calledWith('my_attribute')).to.equal(true);
    expect(tooltip.calledWith('Was not valid')).to.equal(true);
  });
});
