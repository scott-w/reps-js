import {Behavior} from 'backbone.marionette';


/** Renders a loading spinner in the given collectionRegion.
    Once the collection has synchronised, render it for us.
    If the collection is empty, render the emptyView.
*/
export const LoadingBehavior = Behavior.extend({
  defaults: {
    collectionRegion: '.collection-hook',
    loadView: null,
    collectionView: null,
    emptyView: null,
    initialState: 'loading'
  },

  collectionEvents: {
    sync: 'completeLoading',
    request: 'startLoading'
  },

  /** Determine whether to show the loading view or empty view.
  */
  completeLoading: function() {

  },

  /** Set the loading widget
  */
  startLoading: function() {

  }
});
