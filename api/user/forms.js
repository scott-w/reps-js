const validate = require('validate.js');


/** Validate the user update - this differs from create as we separate
*   user fields from password fields. Users cannot change their email address.
*/
exports.userErrors = params => validate(params, {
  first_name: {
    length: {
      minimum: 1
    }
  },
  last_name: {
    length: {
      minimum: 1
    }
  },
  fit_token: {
    length: {
      minimum: 0
    },
    presence: false
  }
});
