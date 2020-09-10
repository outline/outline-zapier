'use strict';

const authentication = {
  type: 'custom',

  test: {
    url: 'https://getoutline.com/api/auth.info'
  },

  connectionLabel: (z, bundle) => {
    // bundle.inputData has whatever comes back from the .test
    const data = bundle.inputData.data;
    return `${data.team.name} (${data.user.name})`;
  },

  fields: [
    {
      key: 'api_token',
      type: 'string',
      required: true,
      helpText: 'Go to "API tokens" under settings in your Outline account to create an API token.'
    }
  ]
};

module.exports = authentication;
