const google = require('googleapis');

const config = require('../../config/google');

const OAuth2 = google.auth.OAuth2;

const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.write'
];

const getClient = function() {
  return new OAuth2(
    config.clientId, config.clientSecret, config.redirectUri);
};

exports.oauth2Client = getClient;
exports.oauthUrl = getClient().generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});
