import Backbone from 'backbone';

/** Handles interaction with a search form. We can use this to search through
    a collection of exercises.
*/
export const SearchModel = Backbone.Model.extend({
  defaults: {
    exercise_name: ''
  },

  url: function() {
    const exercise_name = this.get('exercise_name');
    const query = exercise_name ? `?exercise_name=${exercise_name}` : '';
    return `/exercises/${query}`;
  }
});
