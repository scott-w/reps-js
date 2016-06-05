import {Collection} from 'backbone';
import {View, CollectionView} from 'backbone.marionette';

import expect from 'expect.js';

import {Loading} from '../../app/base/behaviors/loader';


const getBehavior = view => view._behaviors[0];

describe('Loading Behavior', function() {
  let collection;
  let testView;

  const InvalidView = View.extend({
    behaviors: {
      loader: Loading
    }
  });

  const LoadView = View.extend();
  const EmptyView = View.extend();

  const TestView = View.extend({
    behaviors: {
      loader: {
        behaviorClass: Loading,
        loadView: LoadView,
        emptyView: EmptyView,
        collectionView: CollectionView
      }
    }
  });

  const EmptyTestView = View.extend({
    behaviors: {
      loader: {
        behaviorClass: Loading,
        loadView: LoadView,
        emptyView: EmptyView,
        collectionView: CollectionView,
        initialState: 'empty'
      }
    }
  });

  beforeEach(function() {
    collection = new Collection([
      {id: 1, item: 'Data'},
      {id: 3, item: 'Something'}
    ]);
  });

  afterEach(function() {
    collection = null;
    testView = null;
  });

  it('errors out if the options are not set', function() {
    let errorThrown = false;
    try {
      new InvalidView();
    }
    catch (error) {
      errorThrown = true;
      expect(error).to.equal(
        'Behavior keys not set: loadView, collectionView, emptyView');
    }
    expect(errorThrown).to.be(true);
  });

  it('renders a loading view initially', function() {
    testView = new TestView({collection: new Collection()});
    const behavior = getBehavior(testView);

    sinon.stub(testView, 'render');
    sinon.stub(behavior, 'showInRegion');

    testView.triggerMethod('render');

    expect(behavior.showInRegion.calledWith(LoadView)).to.be(true);
  });

  it('loads an empty view when initialState is "empty"', function() {
    testView = new EmptyTestView({collection: new Collection()});
    const behavior = getBehavior(testView);

    sinon.stub(testView, 'render');
    sinon.stub(behavior, 'showInRegion');

    testView.triggerMethod('render');

    expect(behavior.showInRegion.calledWith(EmptyView)).to.be(true);
  });

  it('loads the collection if the collection is populated', function() {
    testView = new TestView({collection: collection});
    const behavior = getBehavior(testView);

    sinon.stub(testView, 'render');
    sinon.stub(behavior, 'showInRegion');

    testView.triggerMethod('render');

    expect(behavior.showInRegion.calledWith(CollectionView)).to.be(true);
  });

  it('shows the empty view if the collection synchronises empty', function() {
    collection = new Collection();
    testView = new TestView({collection: collection});
    const behavior = getBehavior(testView);

    sinon.stub(testView, 'render');
    sinon.stub(behavior, 'showInRegion');

    collection.trigger('sync', collection);

    expect(behavior.showInRegion.calledWith(EmptyView)).to.be(true);
  });

  it('shows the collection view on collection sync', function() {
    testView = new TestView({collection: collection});
    const behavior = getBehavior(testView);

    sinon.stub(testView, 'render');
    sinon.stub(behavior, 'showInRegion');

    collection.trigger('sync', collection);

    expect(behavior.showInRegion.calledWith(CollectionView)).to.be(true);
  });

  it('shows the loader on request trigger', function() {
    testView = new TestView({collection: collection});
    const behavior = getBehavior(testView);

    sinon.stub(testView, 'render');
    sinon.stub(behavior, 'showInRegion');

    collection.trigger('request', collection);

    expect(behavior.showInRegion.calledWith(LoadView)).to.be(true);
  });
});
