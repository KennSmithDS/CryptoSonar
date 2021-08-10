import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './Layout/Layout'
import { Login } from './Sign-In-Page/Login.jsx'
require('dotenv').config({path: '../.env'});

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache()
});


// TODO: Preserve userLogin info upon browser refresh
function App() {
  const [user, setUser] = useState('')
  return (
    <Router >
      <ApolloProvider client={client}>
          <Switch>
            <Route path="/login" component={Login}>
              <Login user={(val) => setUser(val)}/>
            </Route>
            <Route exact path="/" component={Layout}>
              <Layout user={user}/>
            </Route>
          </Switch>        
      </ApolloProvider>
    </Router>
  );
}

export default App;
