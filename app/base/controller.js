import Mn from 'backbone.marionette';
import _ from 'underscore';

import root from '../root';


/** Provides a base controller that oversees interaction with the root view.
    To use this, you must extend the controller with:
      layoutView: The base View that owns the sub-app
      layoutOptions (optional): Any options to pass into instantating layoutView
*/
export const BaseController = Mn.Object.extend({
  mainView: 'main',

  /** Returns whether the current base view is the view being displayed
  */
  showingMyView: function() {
    const view = root.getChildView('main');
    const cid = this.getOption('indexCid');

    if (_.isUndefined(cid)) {
      return false;
    }
    return view.cid === cid;
  },

  /** Forcibly shows this controller's base layout and returns a reference to
      it.
      If the layout is being shown, this won't fire a re-render.
  */
  showAndGetLayout: function(layoutOptions) {
    if (this.showingMyView()) {
      return root.getChildView('main');
    }
    const layout = this._getLayout(layoutOptions);
    root.showChildView('main', layout);
    return layout;
  },

  _getLayout: function(layoutOptions) {
    const Layout = this.getOption('layoutView');
    if (_.isUndefined(Layout)) {
      console.error('You must define a layoutView');
    }
    return new Layout(layoutOptions);
  }
});
