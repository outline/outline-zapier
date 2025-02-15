const docCreate = require('./creates/doc');
const docTrigger = require('./triggers/doc');
const collectionTrigger = require('./triggers/collection');
const authentication = require('./authentication');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    let data;
    try {
      data = JSON.parse(response.content);
    } catch (err) {
      throw new z.errors.Error("An unexpected error occurred", "unexpected", response.status);
    }
    throw new z.errors.Error(`Sorry, ${data.message}`, data.error, response.status);
  }
  return response;
};

const addHeaders = (request, z, bundle) => {
  // Only set the method if it hasn't already been set (e.g. GET for auth.test)
  request.method = request.method || 'POST';
  request.headers = request.headers || {};
  request.headers['X-Application'] = 'Zapier';
  request.headers['Content-Type'] = 'application/json';
  request.headers['Accept'] = 'application/json';
  request.headers['Authorization'] = `Bearer ${bundle.authData.api_token}`;
  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  beforeRequest: [ addHeaders ],
  afterResponse: [ handleHTTPError ],
  resources: {},
  triggers: {
    [collectionTrigger.key]: collectionTrigger,
    [docTrigger.key]: docTrigger
  },
  searches: {},
  creates: {
    [docCreate.key]: docCreate,
  }
};

module.exports = App;
