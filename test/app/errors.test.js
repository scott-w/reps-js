import expect from 'expect.js';

import _ from 'lodash';

import {Model} from 'backbone';
import {View} from 'backbone.marionette';

import {FormError} from '../../app/base/behaviors/form';


describe('Error handler', function() {
  let model;

  const MyView = View.extend({
    behaviors: {
      error: {
        behaviorClass: FormError,
        errors: {
          my_attribute: '.attribute'
        }
      }
    }
  });
  let view;
  let popover;

  beforeEach(function() {
    model = new Model({
      my_attribute: 'My Value'
    });

    view = new MyView({model: model});

    popover = sinon.stub();

    _.each(view._behaviors, behavior => {
      sinon.stub(behavior, 'getUI', () => ({
        popover: popover
      }));
    });
  });

  afterEach(function() {
    _.each(view._behaviors, behavior => {
      behavior.getUI.restore();
    });
    model = null;
    view = null;
    popover = null;
  });

  it('sets up the ui', function() {
    _.each(view._behaviors, behavior => {
      expect(behavior.ui.my_attribute).to.equal('.attribute');
    });
  });

  it('fires error handlers on the view', function() {
    model.trigger('error', model, {
      responseJSON: {
        my_attribute: ['Was not valid']
      }
    });

    expect(popover.calledWith('Was not valid')).to.equal(true);
  });

  it('handles non-array error objects', function() {
    model.trigger('error', model, {
      responseJSON: {
        my_attribute: 'Was not valid'
      }
    });

    expect(popover.calledWith('Was not valid')).to.equal(true);
  });
});
