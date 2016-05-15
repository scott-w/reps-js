const rollbarKey = process.env.NODE_ROLLBAR_KEY || '';

if (!rollbarKey && process.env.NODE_ENV === 'production') {
  console.error('You must configure the rollbar key');
}

exports.rollbarKey = rollbarKey;
exports.useRollbar = !!rollbarKey;
