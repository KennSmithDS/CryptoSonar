import React, { useState } from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'

export const  AddWalletItem = (props) => {
  const { showModal, setShowModal } = props
  const handleClose = () => setShowModal(false);
  const [inputs, setInputs] = useState({}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    SendData();
    handleClose();
  }
  const handleInputChange = ({ target }) => {
    const {name, value} = target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const SendData = () =>{    
    const QUERY = `mutation{
      addWallet(
        alias: "${inputs.walletAlias}"
        address: "${inputs.walletAddress}"
        userId: "${props.userID}")
      {
        alias
        address
      }
    }`

    fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
    })
  }

  return (
    <>
      {showModal ?
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>          
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formWalletAddress">
                  <Form.Label>Wallet Address:</Form.Label>
                  <Form.Control required type="string" placeholder="Wallet Address" name="walletAddress" onChange={handleInputChange} value={inputs.walletAddress || ''}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddressAlias">
                  <Form.Label>Address Alias:</Form.Label>
                  <Form.Control required type="string" placeholder="Address Alias" name="walletAlias" onChange={handleInputChange} value={inputs.walletAlias || ''}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      : null}
    </>
  )
}

export default AddWalletItem
