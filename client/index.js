import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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

ReactDOM.render(<ApolloProvider client={client}>
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={App} />
      <Redirect to='/' />

    </Switch>
  </BrowserRouter>

</ApolloProvider>,
document.getElementById('root'));
