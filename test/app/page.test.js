import {Collection} from 'backbone';
import {View} from 'backbone.marionette';

import expect from 'expect.js';

import {Page} from '../../app/base/behaviors/page';


describe('Page Behavior', function () {
  const PageView = View.extend({
    behaviors: {
      page: Page
    },

    el: 'body',
    template: false
  });
  let view;

  beforeEach(function() {
    view = new PageView({
      collection: new Collection([{key: 'value'}])
    });
  });

  afterEach(function() {
    view = null;
  });

  it('adds the extra paging region', function() {
    view.triggerMethod('before:render');
    expect(view.getRegion('page')).to.not.be(undefined);
  });
});
