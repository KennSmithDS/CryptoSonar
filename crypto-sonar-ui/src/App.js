import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Layout } from './Layout/Layout'
require('dotenv').config({path: '../.env'});

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Layout />
      </div>
    </ApolloProvider>
  );
}

export default App;
