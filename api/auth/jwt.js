/* jshint node: true */
/* jshint esversion: 6 */

var _usertest = {
  5: {
    id: 5,
    email: "scott-w@example.com",
    first_name: "Scott",
    last_name: "Walton"
  }
};

module.exports = function(decoded, request, callback) {
  console.log(decoded);
  return callback(null, true);
};
