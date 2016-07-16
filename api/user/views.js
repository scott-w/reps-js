const bcrypt = require('bcrypt');

const models = require('../../models');

const jwt = require('../auth/jwt');

const forms = require('./forms');
const google = require('./google');


const viewUser = function(request, reply) {
  reply(request.auth.credentials);
};

const updateUser = function(request, reply) {
  const email = request.auth.credentials.email;
  const userErrors = forms.userErrors(request.payload);

  if (userErrors) {
    return reply(userErrors).code(400);
  }

  const first_name = request.payload.first_name;
  const last_name = request.payload.last_name;

  const updateVals = {};
  if (first_name) {
    updateVals.first_name = first_name;
  }
  if (last_name) {
    updateVals.last_name = last_name;
  }

  models.User.update(updateVals, {
    where: {
      email: email
    }
  }).then((userId) => {
    return models.User.findOne({
      where: {id: userId}
    }).then((user) => {
      reply({
        first_name: user.dataValues.first_name,
        last_name: user.dataValues.last_name
      });
    });
  }).catch((err) => {
    console.log(err);
    return reply({error: 'An error occurred'}).code(500);
  });
};

/** Change the user's password and return an updated Token for the user */
const changePassword = function(request, reply) {
  const password1 = request.payload.password1;
  const password2 = request.payload.password2;
  const email = request.auth.credentials.email;

  if (password1 !== password2) {
    return reply({password: 'Passwords do not match'}).code(400);
  }
  bcrypt.hash(password1, bcrypt.genSaltSync(10), (err, hash) => {
    if (err) {
      console.error(err);
      return reply({error: 'An error occurred'}).code(500);
    }

    models.User.update({
      password: hash
    }, {
      where: {
        email: email
      }
    }).then(userId => {
      return models.User.findOne({
        where: {
          id: userId
        }
      });
    }).then(user => {
      const token = jwt.getToken(user.dataValues);
      reply({token: token});
    }).catch(err => {
      console.error(err);
      return reply({error: 'An error occurred'}).code(500);
    });
  });
};

const googleAuth = function(request, reply) {
  return reply.redirect(google.oauthUrl);
};

/** Sets the assigned token from Google */
const googleCallback = function(request, reply) {
  console.log(request.query.code);
  const email = request.auth.credentials.email;
  models.User.update({
    fit_token: request.query.code
  }, {
    where: {
      email: email
    }
  }).then(() => reply.redirect('/profile'));
};

module.exports = {
  user: viewUser,
  update: updateUser,
  password: changePassword,
  google: googleAuth,
  googleCallback: googleCallback
};
