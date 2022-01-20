const sample = require("../samples/doc.json");

const listDocuments = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    url: `https://app.getoutline.com/api/documents.list`,
    params: {
      sort: "updatedAt",
      direction: "DESC",
      collectionId: bundle.inputData.collectionId,
      limit: 20,
      offset: 20 * bundle.meta.page
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content))
    .then(content => content.data)
    .then(items => items.map((item) => {
      const documentId = item.id;
      const documentRevision = item.revision;
      item.id = documentId + '-' + documentRevision;
      return item;
    }));
};

module.exports = {
  key: 'docUpdated',
  noun: 'Document',
  display: {
    label: 'Updated Document',
    description: 'Triggers when a document is updated.'
  },
  operation: {
    inputFields: [
      { key: 'collectionId', label: 'Collection', dynamic: 'collection.id.name' },
    ],
    perform: listDocuments,
    sample
  }
};
