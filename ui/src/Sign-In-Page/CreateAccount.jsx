import React, { useState } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import './Login.css'


export function CreateAccount(props) {
  const { showModal, setShowModal } = props

  const handleClose = () => setShowModal(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('here')
  //   SendData(formState);
    history.push(`/login`)
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

  // const SendData = (formState) => {
  //   fetch(process.env.REACT_APP_API_ENDPOINT, {	
  //     method: 'POST',	
  //     headers: { 'Content-Type': 'application/json' },	
  //     body: JSON.stringify({ query: QUERY }),	
  //   }).then((response) => response.json())	
  //     .then((data) => {
  //       props.user(data.data.userLogin);
  //     });    
  // }

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
            <Button variant="primary" type="submit" 
              onClick={()=>{
                return null;

              }}
            >
              Create Account
            </Button>
          </Form>
          </Modal.Body>
        </Modal>
      : null}
    </>
  );
}

export default CreateAccount
