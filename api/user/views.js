var viewUser = function(request, reply) {
  reply('me');
};

module.exports = {
  user: viewUser
};
