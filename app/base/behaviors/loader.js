import _ from 'underscore';
import {Behavior} from 'backbone.marionette';


/** Renders a loading spinner in the given collectionRegion.
    Once the collection has synchronised, render it for us.
    If the collection is empty, render the emptyView.
*/
export const Loading = Behavior.extend({
  defaults: {
    collectionRegion: 'list',
    loadView: null,
    collectionView: null,
    emptyView: null,
    initialState: 'loading'
  },

  collectionEvents: {
    sync: 'completeLoading',
    request: 'startLoading'
  },

  initialize: function() {
    const keys = ['loadView', 'collectionView', 'emptyView'];
    const notSet = _.filter(keys, key => !this.getOption(key));

    if (notSet.length) {
      const error = notSet.join(', ');
      throw `Behavior keys not set: ${error}`;
    }
  },

  onRender: function() {
    if (this.view.collection.length) {
      this.showCollectionView();
    }
    else {
      this._showEmptyOrLoading();
    }
  },

  /** Determine whether to show the collection view or empty view.
  */
  completeLoading: function(collection) {
    if (collection.length) {
      this.showCollectionView();
    }
    else {
      this.showEmpty();
    }
  },

  /** Show the loaded collection view
  */
  showCollectionView: function() {
    this.showInRegion(this.getOption('collectionView'));
  },

  /** Set the loading widget
  */
  startLoading: function() {
    this.showInRegion(this.getOption('loadView'));
  },

  /** Show a given view in the collection region
  */
  showInRegion: function(View) {
    this.view.showChildView(this.getOption('collectionRegion'), new View({
      collection: this.view.collection
    }));
  },

  /** Show the empty widget
  */
  showEmpty: function() {
    this.showInRegion(this.getOption('emptyView'));
  },

  /** Using the options, show either the loading widget or the empty view - this
      assumes that the collection is empty
  */
  _showEmptyOrLoading: function() {
    const initial = this.getOption('initialState');

    if (initial === 'loading') {
      this.startLoading();
    }
    else if (initial === 'empty') {
      this.showEmpty();
    }
    else {
      throw 'Initial must be loading or empty';
    }
  }
});
