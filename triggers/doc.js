const sample = require("../samples/doc.json");

const listDocuments = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    url: `https://app.getoutline.com/api/documents.list`,
    params: {
      sort: "createdAt",
      direction: "DESC",
      collectionId: bundle.inputData.collectionId,
      limit: 20,
      offset: 20 * bundle.meta.page
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content))
    .then(content => content.data);
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
      { key: 'collectionId', label: 'Collection', dynamic: 'collection.id.name' },
    ],
    perform: listDocuments,
    sample
  }
};
