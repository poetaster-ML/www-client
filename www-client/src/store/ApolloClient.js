import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const baseUri = require('@env').API_ENDPOINT;

const fetchCSRFToken = () => fetch(
  new URL('csrf/', baseUri),
  {
    credentials: 'include'
  }
).then(response =>
  response.text()
).then(token => {
  document.cookie = `csrftoken=${token}`;
  return token;
});

const createClient = async () => {
  const csrfToken = await fetchCSRFToken();
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: baseUri,
    credentials: 'include',
    headers: {
      'X-CSRFToken': csrfToken
    }
  });

  return new ApolloClient({
    cache,
    link
  });
};

export default createClient;
