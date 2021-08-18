import React, {useState} from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { Broadcast } from 'react-bootstrap-icons';
import './Login.css'

import { CreateAccount } from './CreateAccount';

export const Login = (props) => {
  const [formState, setFormState] = useState({
    username: "SpongeBob",
    password: "bob"
  });

  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const [showAlert, setShowAlert] = useState(false);


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
        VerifyData(data.data)
      });    
  }
  
  const VerifyData = data => {
    if(data.userLogin !== null){
      storeUser(data.userLogin)
      history.push(`/`)
    } else{
      setShowAlert(true)
    } 
  }

  const HandleSubmit = (event) => {
    event.preventDefault();
    SendData(formState);    
  }

  const storeUser = (user) =>  {  
    localStorage.setItem('UserCredentials', JSON.stringify(user));
    const userCreds = JSON.parse(localStorage.getItem('UserCredentials'));
    props.setUser(userCreds)
  }


  const handleChange = (e) => {
    setFormState({...formState,
      [e.target.id]: e.target.value
    })
  }

  const NoUserFoundAlert = () => {  
    return(
    showAlert ?
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading><h5>Incorrect username or password!</h5></Alert.Heading>
          <p> Please reenter or create an account to proceed.
          <br/> <strong>Admin Use Only:</strong>
          <br/> u:SpongeBob pw:bob
          <br/> u:JimmyGnome pw:jimmy
          <br/> u:ZoeFish pw:zoe
          <br/> u:MargeInCharge pw:marge
          <br/> u:EarlybirdEarl pw:earl
          </p>
        </Alert>      
    : null
    )
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
              <Form.Control 
                type="text" 
                placeholder="Enter Username" 
                onChange={handleChange} 
                value={formState.username || ''} 
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                onChange={handleChange} 
                value={formState.password || ''} 
              />
            </Form.Group>
            <Row >
            <Container fluid>

              <Button 
                variant="light" 
                type="submit"
              >
                Sign-in
              </Button>
              
              <Button 
                variant="link" 
                onClick={openModal} 
              >
                Create Account
              </Button>
                <CreateAccount 
                  showModal={showModal} 
                  setShowModal={setShowModal} 
                  setUserFormState={formState} 
                />
            </Container>
            </Row>

          </Form>
          <p />
          <NoUserFoundAlert />
        </Col>
      </Row>
    </Container>
  )
}

export default Login