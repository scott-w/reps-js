var viewUser = function(request, reply) {
  reply(request.auth.credentials.dataValues);
};

module.exports = {
  user: viewUser
};
