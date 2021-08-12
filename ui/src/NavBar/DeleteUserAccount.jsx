import React, {useState} from 'react'
import { Button, Container, Alert} from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { REMOVE_USER } from '../utils/queries/graphqlQueries'


export function DeleteUserAccount(props){

  const [delUserAccount, { loading, error }] = useMutation(REMOVE_USER);
  const [show, setShow] = useState(false);


  function handleDeleteUser(){
    setShow(true)

  }

  function sendDeleteUser() { 
    delUserAccount({
      variables: {
        id: props.user.id
      }
    })
    if (loading) return console.log('Submitting...');
    if (error) return console.log(`Submission error! ${error.message}`);
    localStorage.removeItem('UserCredentials')
  }

  function ConfirmDelete() {
    return (
      <Alert show={show} variant="danger">
      <Alert.Heading>Confirm Delete?</Alert.Heading>
        <Button 
          onClick={sendDeleteUser} 
          variant="outline-danger"
          href="/login"
        >
          Yes.
        </Button>
      </Alert>
    )
  }

  return (
    <>
      <Container>
      <h5>Other:</h5>
        <Button 
          variant="danger" 
          onClick={handleDeleteUser}
        >
          Delete Account
        </Button>
        <p />
        <ConfirmDelete />
      </Container>
    </>  
  );
}

export default DeleteUserAccount
