import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const baseUri = require('@env').API_ENDPOINT;

const createClient = async () => {
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: baseUri,
    credentials: 'include'
  });

  console.log(link);

  return new ApolloClient({
    cache,
    link
  });
};

export default createClient;
