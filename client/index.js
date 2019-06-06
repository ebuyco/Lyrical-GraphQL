import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import fetch from 'node-fetch';
import App from './App';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([httpLink])
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root'));
