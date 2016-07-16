const google = require('googleapis');

const config = require('../../config/google');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  config.clientId, config.clientSecret, config.redirectUri);

const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.write'
];

exports.oauthUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});
