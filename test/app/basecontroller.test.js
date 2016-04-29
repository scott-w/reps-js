import expect from 'expect.js';

import root from '../../app/root';
import {View} from 'backbone.marionette';

import {BaseController} from '../../app/base/controller';


describe('BaseController', function() {
  const Controller = BaseController.extend({
    layoutOptions: {
      someOption: 'Value'
    },

    layoutView: View
  });

  let controller;

  beforeEach(function() {
    controller = new Controller();
    sinon.stub(root, 'showChildView');
  });

  afterEach(function() {
    root.showChildView.restore();
    controller = null;
  });

  it('injects pre-set layoutOptions into the view', function() {
    controller.showAndGetLayout();

    expect(root.showChildView.calledWith('main')).to.equal(true);
    expect(root.showChildView.calledOnce).to.equal(true);

    const callArgs = root.showChildView.getCall(0).args;
    expect(callArgs[1].getOption('someOption')).to.equal('Value');
  });

  it('mixes the layoutOptions with passed-in options', function() {
    controller.showAndGetLayout({newOption: 'Different'});

    const callArgs = root.showChildView.getCall(0).args;
    expect(callArgs[1].getOption('newOption')).to.equal('Different');
  });
});
