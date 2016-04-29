const validate = require('validate.js');


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
  }
});
