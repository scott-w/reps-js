const models = require('../../models');

const viewUser = function(request, reply) {
  models.User.findOne({
    where: {
      email: request.auth.credentials.email
    }
  }).then((instance) => {
    reply({
      email: instance.dataValues.email,
      first_name: instance.dataValues.first_name,
      last_name: instance.dataValues.last_name
    });
  }).catch((err) => {
    reply({
      err: err
    }).code(500);
  });
};

module.exports = {
  user: viewUser
};
