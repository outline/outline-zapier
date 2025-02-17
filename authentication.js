'use strict';
const { getBaseUrl } = require('./utils');

const authentication = {
  type: 'custom',

  // Instead of a static object, we define test as a function so we can
  // construct the URL based on the provided instance_url.
  test: async (z, bundle) => {
    const baseUrl = getBaseUrl(bundle);
    const response = await z.request({
      method: 'POST',
      url: `${baseUrl}/api/auth.info`
    });
    try {
      const data = JSON.parse(response.content);
      return data;
    } catch (error) {
      throw new z.errors.Error(
          'Failed to parse authentication response: ' + error.message,
          'parse_error'
      );
    }
  },

  connectionLabel: (z, bundle) => {
    // bundle.inputData contains the data returned from the .test request
    const data = bundle.inputData.data;
    return `${data.team.name} (${data.user.name})`;
  },

  fields: [
    {
      key: 'instance_url',
      type: 'string',
      required: false,
      default: 'https://app.getoutline.com',
      helpText:
          'The URL for your Outline instance. Leave blank to use cloud hosted Outline (https://app.getoutline.com).'
    },
    {
      key: 'api_token',
      type: 'string',
      required: true,
      helpText:
          'Go to "Settings -> API Keys" in your Outline workspace to create a new API key.'
    }
  ]
};

module.exports = authentication;
