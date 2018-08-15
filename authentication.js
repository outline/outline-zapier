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
      helpText: 'API token from your settings'
    }
  ]
};

module.exports = authentication;
