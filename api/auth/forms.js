const validate = require('validate.js');

exports.createUserError = params => validate(params, {
  email: {
    presence: true,
    length: {
      minimum: 2
    }
  },
  first_name: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  last_name: {
    presence: true,
    length: {
      minimum: 1
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 8
    }
  }
});
