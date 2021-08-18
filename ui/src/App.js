import React, { useState, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './Layout/Layout.jsx'
import { Login } from './Sign-In-Page/Login.jsx'
import { PageNotFound } from './Sign-In-Page/Page404.jsx'

require('dotenv').config({ path: '../.env' });

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache()
});

function App() {
  const [user, setUser] = useState('')
  
  useEffect(() => {
    if (localStorage.getItem('UserCredentials')) {
      const userCreds = JSON.parse(localStorage.getItem('UserCredentials'));
      setUser(userCreds)
    }
  }, [setUser]);

  return (
    <div className="App">
      {localStorage.getItem('UserCredentials')
        ? <Router >
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/login" component={Login}>
                <Login setUser={setUser}/>
              </Route>
              <Route exact path="/" component={Layout}>
                <Layout user={user} />
              </Route>
              <Route exact path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
          </ApolloProvider>
        </Router>
        : <Router >
          <Redirect to="/login" />
          <ApolloProvider client={client}>
            <Route path="/login" component={Login}>
              <Login setUser={setUser}/>
            </Route>
          </ApolloProvider>
        </Router>
      }
    </div>
  );
}

export default App;
