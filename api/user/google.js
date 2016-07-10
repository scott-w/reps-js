const google = require('googleapis');

const config = require('../../config/google');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  config.clientId, config.clientSecret, config.redirectUri);

const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.write'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});
