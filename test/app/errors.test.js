import expect from 'expect.js';

import _ from 'lodash';

import {Model} from 'backbone';
import {View} from 'backbone.marionette';

import {FormError, ValidationError} from '../../app/base/behaviors/form';


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
  let append;

  beforeEach(function() {
    model = new Model({
      my_attribute: 'My Value'
    });

    view = new MyView({model: model});

    append = sinon.stub();

    _.each(view._behaviors, behavior => {
      let ui = {
        parent: () => ({
          append: append
        })
      };
      sinon.stub(behavior, 'getUI', () => ui);
    });
  });

  afterEach(function() {
    _.each(view._behaviors, behavior => {
      behavior.getUI.restore();
    });
    model = null;
    view = null;
    append = null;
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

    expect(append.calledOnce).to.equal(true);
  });

  it('handles non-array error objects', function() {
    model.trigger('error', model, {
      responseJSON: {
        my_attribute: 'Was not valid'
      }
    });

    expect(append.calledOnce).to.equal(true);
  });

  it('renders the template with the right data', function() {
    const behavior = _.reduce(view._behaviors, (memo, behavior) => {
      if (memo) {
        return memo;
      }
      return behavior.getPopoverTemplate ? behavior : false;
    }, false);
    sinon.stub(behavior, 'getPopoverTemplate', () => '');

    model.trigger('error', model, {
      responseJSON: {
        my_attribute: 'Was not valid'
      }
    });

    expect(behavior.getPopoverTemplate.calledWith('Was not valid')).to.be(true);
  });

  it('renders the template receiving an array of data', function() {
    const behavior = _.reduce(view._behaviors, (memo, behavior) => {
      if (memo) {
        return memo;
      }
      return behavior.getPopoverTemplate ? behavior : false;
    }, false);
    sinon.stub(behavior, 'getPopoverTemplate', () => '');

    model.trigger('error', model, {
      responseJSON: {
        my_attribute: ['Was not valid']
      }
    });

    expect(behavior.getPopoverTemplate.calledWith('Was not valid')).to.be(true);
  });

  it('clears errors when the user does something', function() {
    const behavior = _.reduce(view._behaviors, (memo, behavior) => {
      if (memo) {
        return memo;
      }
      return behavior.getPopoverTemplate ? behavior : false;
    }, false);

    const remove = sinon.stub();
    sinon.stub(behavior, '$', () => ({remove: remove}));

    view.$el.trigger('click');

    expect(behavior.$.calledWith('.form-error')).to.be(true);
    expect(remove.calledOnce).to.be(true);
  });
});


describe('Validation handler', function() {
  const MyModel = Model.extend({
    validate: () => ({my_attribute: 'Was not valid'})
  });
  let model;

  const MyView = View.extend({
    behaviors: {
      error: {
        behaviorClass: ValidationError,
        errors: {
          my_attribute: '.attribute'
        }
      }
    }
  });
  let view;
  let append;

  beforeEach(function() {
    model = new MyModel();

    view = new MyView({model: model});

    append = sinon.stub();

    _.each(view._behaviors, behavior => {
      let ui = {
        parent: () => ({
          append: append
        })
      };
      sinon.stub(behavior, 'getUI', () => ui);
    });
  });

  afterEach(function() {
    _.each(view._behaviors, behavior => {
      behavior.getUI.restore();
    });
    model = null;
    view = null;
    append = null;
  });

  it('sets up the ui', function() {
    _.each(view._behaviors, behavior => {
      expect(behavior.ui.my_attribute).to.equal('.attribute');
    });
  });

  it('fires error handlers on the view', function() {
    model.set('my_attribute', 'Some value', {validate: true});

    expect(append.calledOnce).to.equal(true);
  });

  it('renders the template with the right data', function() {
    const behavior = _.reduce(view._behaviors, (memo, behavior) => {
      if (memo) {
        return memo;
      }
      return behavior.getPopoverTemplate ? behavior : false;
    }, false);
    sinon.stub(behavior, 'getPopoverTemplate', () => '');

    model.set('my_attribute', 'Some value', {validate: true});

    expect(behavior.getPopoverTemplate.calledWith('Was not valid')).to.be(true);
  });

  it('clears errors when the user does something', function() {
    const behavior = _.reduce(view._behaviors, (memo, behavior) => {
      if (memo) {
        return memo;
      }
      return behavior.getPopoverTemplate ? behavior : false;
    }, false);

    const remove = sinon.stub();
    sinon.stub(behavior, '$', () => ({remove: remove}));

    view.$el.trigger('click');

    expect(behavior.$.calledWith('.form-error')).to.be(true);
    expect(remove.calledOnce).to.be(true);
  });
});
