const sample = require("../samples/doc.json");
const { getBaseUrl } = require("../utils");

const listDocuments = async (z, bundle) => {
  const baseUrl = getBaseUrl(bundle);
  const response = await z.request({
    method: 'POST',
    url: `${baseUrl}/api/documents.list`,
    params: {
      sort: "createdAt",
      direction: "DESC",
      collectionId: bundle.inputData.collectionId,
      limit: 20,
      offset: 20 * bundle.meta.page
    }
  });

  try {
    const content = JSON.parse(response.content);
    return content.data;
  } catch (error) {
    throw new Error("Failed to parse documents response: " + error.message);
  }
};

module.exports = {
  key: 'doc',
  noun: 'Document',
  display: {
    label: 'New Document',
    description: 'Triggers when a new document is published.'
  },
  operation: {
    inputFields: [
      { key: 'collectionId', label: 'Collection', dynamic: 'collection.id.name' }
    ],
    perform: listDocuments,
    sample
  }
};
