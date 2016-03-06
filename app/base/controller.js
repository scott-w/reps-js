import Mn from 'backbone.marionette';
import _ from 'underscore';

import root from '../root';


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
  showAndGetLayout: function() {
    if (this.showingMyView()) {
      return root.getChildView('main');
    }
    const layout = this._getLayout();
    root.showChildView('main', layout);
    return layout;
  },

  _getLayout: function() {
    const Layout = this.getOption('layoutView');
    if (_.isUndefined(Layout)) {
      console.error('You must define a layoutView');
    }
    const layoutOptions = this.getOption('layoutOptions');
    return new Layout(layoutOptions);
  }
});
