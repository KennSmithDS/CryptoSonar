import React, {useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { Broadcast } from 'react-bootstrap-icons';
import './Login.css'

export const Login = (props) => {
  const [formState, setFormState] = useState({
    username: "SpongeBob",
    password: "bob"
  });
  const history = useHistory();
  
  const QUERY = `
  query UserLogin {
    userLogin(userName:"${formState.username}", userPassword:"${formState.password}") {
      id userName
    }
  }`

  const SendData = (formState) => {
    fetch(process.env.REACT_APP_API_ENDPOINT, {	
      method: 'POST',	
      headers: { 'Content-Type': 'application/json' },	
      body: JSON.stringify({ query: QUERY }),	
    }).then((response) => response.json())	
      .then((data) => {
        props.user(data.data.userLogin);
      });    
  }
  
  const HandleSubmit = (event) => {
    event.preventDefault();
    SendData(formState);
    history.push(`/`)
  }

  const handleChange = (e) => {
    setFormState({...formState,
      [e.target.id]: e.target.value
    })
  }

  return (
    <Container>
      <Row>
        <Col className="sign-in" md={{ span: 4, offset: 3 }}>
          <h1>CryptoSONAR  <Broadcast size={50}/></h1>
          <h2>Sign-in</h2>
          <Form className="sign-in-form" onSubmit={HandleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={handleChange} value={formState.username || ''} />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handleChange} value={formState.password || ''} />
            </Form.Group>
            <Row>
              <Button variant="primary" type="submit">Sign-in</Button>
              <Button variant="link">Create Account</Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login

// // Startercode For GQL implementation:
// import {USER_LOGIN} from '../utils/queries/graphqlQueries'
// import { useLazyQuery, useQuery } from '@apollo/client'

  // const [userLogin, { data, loading, error }] = useLazyQuery(USER_LOGIN);
  // const SendData = (formState) => {
  //   userLogin({  
  //     variables: {
  //       userName: formState.username,
  //       userPassword: formState.password 
  //     },      
  //   });
  // }
  // const GetUserID = (val) =>{
  //   props.userId(val)
  //   history.push(`/home`)
  // }
  // if (data !== undefined){
  //   GetUserID(data.userLogin)
  //   return null;
  // }