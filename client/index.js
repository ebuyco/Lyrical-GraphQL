import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache
})

ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, 
    document.getElementById('root'));