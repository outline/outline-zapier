const triggerCollection = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://getoutline.com/api/collections.list',
    params: {
      limit: 20,
      offset: 20 * bundle.meta.page
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content))
    .then(content => content.data);
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
    inputFields: [

    ],
    perform: triggerCollection
  }
};
