import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const env = require('@env');
const baseUri = env.API_ENDPOINT;
const link = createHttpLink({ uri: baseUri });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
