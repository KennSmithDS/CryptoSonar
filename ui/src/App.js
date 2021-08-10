import React, { useState, useEffect } from 'react';
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


function App() {
  const [user, setUser] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  
  useEffect(() => {
      const userCreds = JSON.parse(localStorage.getItem('UserCredentials'));
      setUser(userCreds)
    
  }, [setUser, userLoggedIn]);


  return (
    <Router >
      <ApolloProvider client={client}>
        <Route path="/login" component={Login}>
          <Login userLoggedIn={setUserLoggedIn}/>
        </Route>
        <Route exact path="/" component={Layout}>
          <Layout user={user}/>
        </Route>
      </ApolloProvider>
    </Router>
  );
}

export default App;
