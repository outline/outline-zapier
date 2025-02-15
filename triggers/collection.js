const { getBaseUrl } = require("../utils");

const listCollections = async (z, bundle) => {
  const baseUrl = getBaseUrl(bundle);
  const response = await z.request({
    method: 'POST',
    url: `${baseUrl}/api/collections.list`,
    params: {
      sort: "name",
      direction: "ASC",
      limit: 20,
      offset: 20 * bundle.meta.page
    }
  });

  try {
    const content = JSON.parse(response.content);
    return content.data;
  } catch (error) {
    throw new Error("Failed to parse collections response: " + error.message);
  }
};

module.exports = {
  key: 'collection',
  noun: 'Collection',
  display: {
    label: 'Get Collection',
    hidden: true,
    description: 'The only purpose of this trigger is to populate the dropdown list of collections in the UI, thus, it\'s hidden.'
  },
  operation: {
    inputFields: [],
    perform: listCollections
  }
};
