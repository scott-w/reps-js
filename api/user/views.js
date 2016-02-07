const viewUser = function(request, reply) {
  reply(request.auth.credentials);
};

module.exports = {
  user: viewUser
};
