import Vue from 'vue';
import VueApollo from 'vue-apollo';
import createClient from './client';

Vue.use(VueApollo);

const createApolloProvider = async () => {
  return new VueApollo({ defaultClient: await createClient() });
};

export default createApolloProvider;
