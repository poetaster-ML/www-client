import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const createClient = async () => {
  const env = require('@env');
  const baseUri = env.API_ENDPOINT;
  const link = createHttpLink({ uri: baseUri });

  const cache = new InMemoryCache();
  await persistCache({
    cache,
    storage: window.localStorage
  });

  return new ApolloClient({ link, cache });
};

export default createClient;
