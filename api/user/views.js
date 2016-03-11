const models = require('../../models');

const viewUser = function(request, reply) {
  reply(request.auth.credentials);
};

const updateUser = function(request, reply) {
  const email = request.auth.credentials.email;
  const first_name = request.payload.first_name;
  const last_name = request.payload.last_name;

  const updateVals = {};
  console.log(request.payload, '\n\n\n\n\n\n\n\n\n\n');
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
    reply({error: 'An error occurred'}).code(500);
  });
};

module.exports = {
  user: viewUser,
  update: updateUser
};
