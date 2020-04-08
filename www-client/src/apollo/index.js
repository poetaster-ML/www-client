import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(VueApollo);

const baseUri = require('@env').API_ENDPOINT;
const link = createHttpLink({
  uri: baseUri
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default new VueApollo({
  defaultClient: client
});
