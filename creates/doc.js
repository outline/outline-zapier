const sample = require("../samples/doc.json");
const { getBaseUrl } = require("../utils");

const createDoc = async (z, bundle) => {
  const baseUrl = getBaseUrl(bundle);
  const response = await z.request({
    method: 'POST',
    url: `${baseUrl}/api/documents.create`,
    body: JSON.stringify({
      collectionId: bundle.inputData.collectionId,
      publish: bundle.inputData.publish,
      title: bundle.inputData.title,
      text: bundle.inputData.text,
      parentDocumentId: bundle.inputData.parentDocumentId
    })
  });

  try {
    const content = JSON.parse(response.content);
    return content.data;
  } catch (error) {
    throw new Error("Failed to parse create document response: " + error.message);
  }
};

module.exports = {
  key: 'doc',
  noun: 'Document',
  display: {
    label: 'Create Document',
    description: 'Creates a document.'
  },
  operation: {
    inputFields: [
      { key: 'collectionId', label: 'Collection', required: true, dynamic: 'collection.id.name' },
      { key: 'parentDocumentId', label: 'Parent Document', required: false, dynamic: 'doc.id.title' },
      { key: 'title', label: 'Title', required: true },
      { key: 'text', label: 'Text', required: true },
      { key: 'publish', label: 'Publish', required: true, type: 'boolean' }
    ],
    perform: createDoc,
    sample
  }
};
