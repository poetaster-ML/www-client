import Vue from 'vue';
import VueApollo from 'vue-apollo';
import createClient from './client';

Vue.use(VueApollo);

let client = null;

const getClient = async () => {
  if (!client) client = await createClient();
  return client;
};

const createApolloProvider = async () => {
  return new VueApollo({ defaultClient: await getClient() });
};

export default createApolloProvider;

export {
  getClient
};
