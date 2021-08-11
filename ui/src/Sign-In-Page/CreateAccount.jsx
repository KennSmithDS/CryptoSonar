import React, { useState } from 'react'
import {Modal, Button, Form, Alert, Row, Container} from 'react-bootstrap'
import { ADD_USER } from '../utils/queries/graphqlQueries'
import { useMutation } from '@apollo/client'



import './Login.css'

export function CreateAccount(props) {
  const { showModal, setShowModal } = props
  const [showPwAlert, setShowPwAlert] = useState(false);

  const handleClose = () => setShowModal(false);

  function checkPassword() {
    console.log(formState.password)
    console.log(formState.confirmPassword)
    return formState.password === formState.confirmPassword
  }

  const handleSubmit = () => {    
    if(checkPassword()) {
      setShowModal(false)
      props.setUserFormState.username = formState.username
      props.setUserFormState.password = ''
      SendData(formState)
    } else {
      setShowPwAlert(true)
    }
  }

  const [formState, setFormState] = useState({
    username: "Patrick",
    password: "Star",
    confirmPassword: "Star"
  });

  const handleChange = (e) => {
    setFormState({...formState,
      [e.target.id]: e.target.value
    })
  }

  const [addUser, { loading, error }] = useMutation(ADD_USER);
    
  const SendData = (formState) => {
    addUser({
      variables:{
        userName: formState.username,
        userPassword: formState.password,
      }
    })
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  }

  const PwMatchError = () => {  
    return(
      showPwAlert ?        
        <Alert variant="danger" onClose={() => setShowPwAlert(false)} dismissible>
          <Alert.Heading><h5>Passwords do not match.</h5></Alert.Heading>
        </Alert>      
    : null
    )
  }

  return (
    <>
      {showModal ?
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>            
          <Form className="create-account-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={handleChange} value={formState.username || ''} />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handleChange} value={formState.password || ''} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" placeholder="confirmPassword" onChange={handleChange} value={formState.confirmPassword || ''} />
            </Form.Group>
          </Form>
          <Container>
            <Row>
              <Button 
                variant="primary" 
                type="submit" 
                href="#"
                onClick={()=>{handleSubmit()}}
              >
                Create Account
              </Button>
            </Row>
            <p />
            <Row>
              <PwMatchError />
            </Row>
            </Container>
          </Modal.Body>
          {/* <Modal.Footer>
            <Row>
              <Button 
                variant="primary" 
                type="submit" 
                href="#"
                onClick={()=>{handleSubmit()}}
              >
                Create Account
              </Button>
            </Row>
            <Row>
              <PwMatchError />
            </Row>
          </Modal.Footer> */}
        </Modal>
      : null}
    </>
  );
}

export default CreateAccount
