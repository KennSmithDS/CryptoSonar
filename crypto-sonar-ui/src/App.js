require('dotenv').config();
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, ApolloProvider } from "@apollo/client";

import { Layout } from './Layout/Layout'

const client = new ApolloClient({
  uri: process.env.API_ENDPOINT
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
