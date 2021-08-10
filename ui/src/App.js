import React, { useState, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './Layout/Layout'
import { Login } from './Sign-In-Page/Login.jsx'
import { PageNotFound } from './Sign-In-Page/Page404'

require('dotenv').config({path: '../.env'});

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache()
});


function App() {
  const [user, setUser] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('UserCredentials')){
      const userCreds = JSON.parse(localStorage.getItem('UserCredentials'));
      setUser(userCreds)
      setUserLoggedIn(true)
    }else{
      setUserLoggedIn(false)
    }    
  }, [setUser, userLoggedIn]);



  return (
    <Router >
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/login" component={Login}>
            <Login userLoggedIn={setUserLoggedIn}/>
          </Route>
          <Route exact path="/" component={Layout}>
            <Layout user={user}/>
          </Route>
          <Route exact path="/404" component={PageNotFound} />
          <Redirect to="/404" /> 
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
