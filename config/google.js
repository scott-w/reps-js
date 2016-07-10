var _ = require('lodash');

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;

const testing = _.includes(['test', 'ci', 'development'], process.env.NODE_ENV);
const credentials = credential => testing && !credential ? 'test' : credential;

exports.clientId = credentials(googleId);
exports.clientSecret = credentials(googleSecret);
exports.redirectUri = credentials(redirectUri);
